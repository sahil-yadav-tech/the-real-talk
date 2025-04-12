const mongoose = require("mongoose");
// const MONGO_URI =process.env.MONGO_URI
const MONGO_URI = "mongodb://127.0.0.1:27017/lectureDB";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {});
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
