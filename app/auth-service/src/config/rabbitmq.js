import amqplib from "amqplib";

let connection = null;
let confirmChannel = null;
let reconnecting = false;

export const EXCHANGES = {
  SEND_OTP: "SEND_OTP",
};

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
   connection = await amqplib.connect(process.env.RABBITMQ_URL)
    //   protocol: "amqp",
    //   hostname: process.env.RABBITMQ_HOST || "localhost",
    //   port: parseInt(process.env.RABBITMQ_PORT || "5672"),
    //   username: process.env.RABBITMQ_USER || "admin",
    //   password: process.env.RABBITMQ_PASS || "admin123",
    // });

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

    // Create confirm channel for publishing
    confirmChannel = await connection.createConfirmChannel(); 

    // Setup exchanges
    await setupExchanges();

    console.log("RabbitMQ Ready 🚀");
  } catch (error) {
    console.error("RabbitMQ Connection Failed:", error.message);
    reconnect();
  }
};

export const getConfirmChannel = () => {
  if (!confirmChannel) {
    throw new Error("RabbitMQ not initialized");
  }
  return confirmChannel;
};

export const setupExchanges = async () => {
  const ch = getConfirmChannel();

  await ch.assertExchange(EXCHANGES.SEND_OTP, "topic", {
    durable: true,
  });

  console.log("All Exchanges Ready ✅");
};

// Graceful Shutdown
const shutdown = async () => {
  try {
    console.log("Closing RabbitMQ...");
    await confirmChannel?.close();
    await connection?.close();
    console.log("RabbitMQ Closed Successfully 🔒");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown Error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
