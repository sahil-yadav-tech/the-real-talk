console.log("JAI SHREE RAM JI / JAI BAJARANG BALI JI❤️");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/dbConn");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);


const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/api/admin", adminRoutes);

const courseRoutes = require("./routes/course.routes");
app.use("/api/course", courseRoutes);


const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
