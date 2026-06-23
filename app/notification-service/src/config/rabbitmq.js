import amqplib from "amqplib";
import startEmailConsumer from "../events/consumers/consumers.js";

let connection = null;
let confirmChannel = null;
let reconnecting = false;

const reconnect = () => {
  if (reconnecting) return;
  reconnecting = true;
  console.log("Reconnecting RabbitMQ in 5 seconds...");
  setTimeout(async () => {
    reconnecting = false;
    await connectRabbitMq();
  }, 5000);
};

export const connectRabbitMq = async () => {
  try {
    // connection = await amqplib.connect({
    //   protocol: "amqp",
    //   hostname: process.env.RABBITMQ_HOST || "localhost",
    //   port: parseInt(process.env.RABBITMQ_PORT || "5672"),
    //   username: process.env.RABBITMQ_USER || "admin",
    //   password: process.env.RABBITMQ_PASS || "admin123",
    // });

    connection = await amqplib.connect(process.env.RABBITMQ_URL)
    await setUpQueue();
    await startEmailConsumer();
    console.log("RabbitMQ Connection Established ✅");

    connection.on("error", (err) => {
      console.error("RabbitMQ Error:", err.message);
    });

    connection.on("close", () => {
      console.error("RabbitMQ Connection Closed ❌");
      connection = null;
      confirmChannel = null;
      reconnect();
    });

    console.log("RabbitMQ Connected ✅");
  } catch (error) {
    console.error("RabbitMQ Connection Failed:", error.message);
    reconnect();
  }
};

export const createChannel = async () => {
  if (!connection) {
    throw new Error("RabbitMQ not connected");
  }
  return await connection.createChannel();
};

export const setUpQueue = async () => {
  let channel;
  try {
    channel = await createChannel();
    
    // 1. Main Exchange
    await channel.assertExchange("SEND_OTP", "topic", { durable: true });
    
    // 2. Retry Exchange
    await channel.assertExchange("retry_email", "direct", { durable: true });
    
    // 3. DLX Exchange
    await channel.assertExchange("dlx_exchange", "direct", { durable: true });

    // 4. Main Queue - email_send
    await channel.assertQueue("email_send", {
      durable: true,
      arguments: {
        "x-dead-letter-exchange": "dlx_exchange",
        "x-dead-letter-routing-key": "email.dead",
        "x-message-ttl": 86400000, // 24 hours
      },
    });
    await channel.bindQueue("email_send", "SEND_OTP", "user.create");

    // 5. Retry Queue - FIXED ✅
    await channel.assertQueue("retry_email_queue", {
      durable: true,
      arguments: {
        "x-message-ttl": 5000, // 5 seconds
        "x-dead-letter-exchange": "SEND_OTP", // 👈 Back to main exchange
        "x-dead-letter-routing-key": "user.create", // 👈 Back to main routing key
      },
    });
    await channel.bindQueue("retry_email_queue", "retry_email", "email.retry");

    // 6. DLQ
    await channel.assertQueue("email_dlq", { durable: true });
    await channel.bindQueue("email_dlq", "dlx_exchange", "email.dead");

    console.log("Queue setup completed ✅");
  } catch (error) {
    console.error("Queue setup failed:", error);
    throw error;
  } finally {
    if (channel) await channel.close();
  }
};