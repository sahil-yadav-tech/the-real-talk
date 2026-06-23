import amqp from "amqplib";

try {
  console.log("Connecting...");

  const conn = await amqp.connect(
    "amqp://admin:admin123@localhost:5672"
  );

  console.log("✅ Connected");

  const ch = await conn.createChannel();

  console.log("✅ Channel Created");

  await ch.close();
  await conn.close();

  console.log("✅ Success");
} catch (err) {
  console.error(err);
}