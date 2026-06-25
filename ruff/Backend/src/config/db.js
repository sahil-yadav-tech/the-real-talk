import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/*
TODO: DATABASE CONNECTION 
*/
const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URL;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(uri, {});

    console.log("MongoDB connected successfully✅");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
