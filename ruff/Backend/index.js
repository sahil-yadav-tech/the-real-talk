console.log("JAI SHREE RAM JI / JAI BAJARANG BALI JI ❤️ 👏😍");

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import cookieParser from "cookie-parser"
/*
Local Imports
*/

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";

/*
App Initialization
*/
const app = express();
const server = http.createServer(app);

/*
Environment Variables
*/
const PORT = process.env.PORT || 9876;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

/*
Database Connection
*/
connectDB();

/*
Middlewares
*/
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
/*
Socket.IO Configuration
*/
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

/*
Socket Events
*/
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

/*
API Routes
*/
app.use("/api/auth", authRoutes);

/*
Health Check Route
*/
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});

/*
Server Listener
*/
server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT} 🚀`);
});