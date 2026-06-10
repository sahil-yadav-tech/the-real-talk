console.log("JAI SHREE RAM JI / JAI BAJARANG BALI JI ❤️ 👏😍");

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRoutes from "./src/routes/auth.routes.js"
import connectDB from "./src/config/db.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use("/api/auth", authRoutes);
const PORT = 9876

server.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});


