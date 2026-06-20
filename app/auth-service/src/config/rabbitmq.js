import amqplib from "amqplib";

let connection = null;
let confirmChannel = null;
let reconnecting = false;

export const EXCHANGES = {
  ORDER: "order_exchange",
  SEND_OTP: "SEND_OTP",
  USER_OTP: "USER_OTP",
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
    connection = await amqplib.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: parseInt(process.env.RABBITMQ_PORT || '5672'),
      username: process.env.RABBITMQ_USER || 'admin',
      password: process.env.RABBITMQ_PASS || 'admin123'
    });

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

    // Producer Confirm Channel
    confirmChannel = await connection.createConfirmChannel();

    // Create exchanges after every connection/reconnection
    await setupProducer();

    console.log("RabbitMQ Ready 🚀");
  } catch (error) {
    console.error(
      "RabbitMQ Connection Failed:",
      error.message
    );

    reconnect();
  }
};

export const getConfirmChannel = () => {
  if (!confirmChannel) {
    throw new Error("RabbitMQ not initialized");
  }

  return confirmChannel;
};

export const setupProducer = async () => {
  const ch = getConfirmChannel();

  // await ch.assertExchange(EXCHANGES.ORDER, "topic", {
  //   durable: true,
  // });

  await ch.assertExchange(EXCHANGES.SEND_OTP, "topic", {
    durable: true,
  });

  // await ch.assertExchange(EXCHANGES.USER_OTP, "topic", {
  //   durable: true,
  // });

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