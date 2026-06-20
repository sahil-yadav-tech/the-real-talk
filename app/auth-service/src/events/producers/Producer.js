import amqplib from "amqplib";
import { getConfirmChannel } from "../../config/rabbitmq.js";
import crypto from "crypto";

export const publishEvent = async (name, data) => {
  try {
    console.log(data, "data in publishEvent");

    let channel = await getConfirmChannel();
    const payload = Buffer.from(
      JSON.stringify({
        email: data.email,
        phoneNumber: data.phoneNumber,
      }),
    );

    await channel.publish(name, "order.create", payload, {
      presistent: true,
      messageId: crypto.randomUUID(),
    });
    await channel.waitForConfirms();
  } catch (error) {
    console.log(error, "error while pubish");
  }
};
