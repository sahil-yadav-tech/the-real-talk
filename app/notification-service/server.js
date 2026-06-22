console.log("JAI SHREE RAM JI / JAI BAJARANG BALI JI ❤️👏😍");
import "dotenv/config";
import app from "./src/app.js";
// import connectDB from "./src/config/db.js";
// import redis from "./src/config/redis.config.js";
import mongoose from "mongoose"
import { connectRabbitMq } from "./src/config/rabbitmq.js";
const PORT = process.env.PORT

// Boot sequence
const start = async () => {
  try {
    // await connectDB();
    await connectRabbitMq()
    
    const server = app.listen(PORT, () => {
      console.log(`[server] Running on port ${PORT} 🚀`);
    });

    // Graceful shutdown
    const shutdown = async (signal) => {
      console.log(`[server] ${signal} received — shutting down`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    // Catch unhandled errors — prevents silent crashes
  } catch (err) {
    console.error("[server] Failed to start:", err);
    process.exit(1);
  }
};

start();
