import amqplib from "amqplib";
import { createChannel } from "../../config/rabbitmq.js";
import { sendEmail } from "../../config/mail/sendmail.js";
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

        // Email send logic here
        // throw new Error("Error while sending email"); // 👈 UNCOMMENT to test retry
         await sendEmail(messageData.email,
            "Your OTP Code",
            `Your OTP for registration is: ${messageData.email}`,
         )
        
        channel.ack(message);
      } catch (error) {
        console.log(error, "error");

        if (retryCount >= MAX_RETRY) {
          console.log("Max Retry Reached ❌ Moving To DLQ");
          channel.nack(message, false, false);
          return;
        }

        // Publish to retry exchange
        channel.publish("retry_email", "email.retry", message.content, {
          persistent: true,
          messageId: message.properties.messageId,
          headers: {
            ...message.properties.headers,
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