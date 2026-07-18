import amqplib from "amqplib";
import { createChannel } from "../../config/rabbitmq.js";
import { sendEmail } from "../../config/mail/sendmail.js";
import redis from "../../config/redis.config.js";
import ProcessedMessage from "../../models/ProcessedMessage.js";

const MAX_RETRY = 3;

const startEmailConsumer = async () => {
  let channel;

  try {
    channel = await createChannel();

    await channel.prefetch(1);

    await channel.consume("email_send", async (message) => {
      if (!message) return;

      const messageData = JSON.parse(message.content.toString());

      console.log(messageData, "messageData");

      const messageId = message.properties.messageId;
      const headers = message.properties.headers || {};
      const retryCount = headers["x-retry-count"] || 0;

      try {
        console.log(messageId, "messageId");
        console.log(headers, "headers");
        console.log(retryCount, "retryCount");

        const idempotencyKey = `REGISTER:${messageData.email}`;

        // Redis Lock
        const lock = await redis.set(idempotencyKey, "processing", {
          NX: true,
          EX: 600,
        });

        if (!lock) {
          console.log("Duplicate Request");

          channel.ack(message);

          return;
        }

        // MongoDB Idempotency
        try {
          await ProcessedMessage.create({
            messageId,
            idempotencyKey,
            email: messageData.email,
            status: "PROCESSING",
          });
        } catch (err) {
          if (err.code === 11000) {
            console.log("Duplicate Message");

            channel.ack(message);

            return;
          }

          throw err;
        }

        // Business Logic
        // throw new Error("Error while sending email");

        await sendEmail(
          messageData.email,
          "Your OTP Code",
          `Your OTP for registration is: ${messageData.otp}`
        );

        await ProcessedMessage.updateOne(
          {
            idempotencyKey,
          },
          {
            $set: {
              status: "COMPLETED",
            },
          }
        );

        await redis.expire(idempotencyKey, 600);

        channel.ack(message);
      } catch (error) {
        console.log(error, "error");

        if (retryCount >= MAX_RETRY) {
          console.log("Max Retry Reached ❌ Moving To DLQ");

          channel.nack(message, false, false);

          return;
        }

        channel.publish("retry_email", "email.retry", message.content, {
          persistent: true,
          messageId,
          headers: {
            ...headers,
            "x-retry-count": retryCount + 1,
          },
        });

        console.log(`Retry Scheduled ${retryCount + 1}`);

        channel.ack(message);
      }
    });

    console.log("Email consumer started ✅");
  } catch (error) {
    console.log("Consumer error:", error);

    throw error;
  }
};

export default startEmailConsumer;