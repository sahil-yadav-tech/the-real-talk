import { getConfirmChannel, EXCHANGES } from "../../config/rabbitmq.js";
import crypto from "crypto";

export const publishEvent = async (exchangeName, data, routingKey = "user.create") => {
  try {
    console.log(data, "data in publishEvent");

    const channel = getConfirmChannel();
    
    const payload = Buffer.from(
      JSON.stringify({
        email: data.email,
        phoneNumber: data.phoneNumber,
        otp: data.otp,
        type: data.type,
        firstName: data.firstName,
      }),
    );

    channel.publish(exchangeName, routingKey, payload, {
      persistent: true,
      messageId: crypto.randomUUID(),
      timestamp: Date.now(),
    });

    await channel.waitForConfirms();
    console.log(`✅ Message published to ${exchangeName} with routing key ${routingKey}`);
    
  } catch (error) {
    console.error("Error while publishing:", error);
    throw error;
  }
};