import amqplib from "amqplib";
let connection;
let confirmChannel;

export const connectRabbitMq = async () => {
  try {
    connection = await amqplib.connect("amqp://localhost");
    // channel = await connection.createChannel();
    console.log("Connection successfully✅");

    connection.on("error", (err) => {
      console.error("RabbitMQ Connection Error:", err.message);
      connection = null;
    });

    connection.on("close", () => {
      console.error("RabbitMQ Connection Closed — reconnecting...");
      connection = null;
      setTimeout(connectRabbitMQ, 5000);
    });

    // enable confirmChannel when prdoucer send message to confirm message
    confirmChannel = await connection.createConfirmChannel();

    console.log("RabbitMQ Connected ✅");
  } catch (error) {
    setTimeout(() => {
      connectRabbitMq()
    }, 5000)
  }
};

// Producer channel — shared, ek hi instance
export const getConfirmChannel = () => {
  if (!confirmChannel) throw new Error("RabbitMQ not initialized");
  return confirmChannel;
};
export const setupProducer = async () => {
  const ch = await getConfirmChannel();
  await ch.assertExchange("order_exchange", "topic", {
    durable: true,
  });

  console.log("order_exchange ready ✅");
};

process.on("SIGINT", async (req, res) => {
  try {
    await confirmChannel?.close();
    await connection?.close();
    console.log("RabbitMQ Closed sucessfully🔒");

    process.exit(1);
  } catch (error) {
    console.log(error, "error in sigint");
    process.exit();
  }
});
