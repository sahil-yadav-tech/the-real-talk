import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/index.js";
import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/userRoutes.js";
// import { errorHandler } from "./middlewares/errorHandler.js";
// import { notFound } from "./middlewares/notFound.js";
const app = express();

// Security middleware

app.use(helmet());
app.use(cors({ origin: config.allowedOrigins, credentials: true }));

// Request parsing
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));


// Logging
// if (config.env !== "test") {
//   app.use(morgan(config.env === "production" ? "combined" : "dev"));
// }

// Health check

app.get("/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() }),
);

// API routes

app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/users", userRoutes);
// // Error handling — must be last
// app.use(notFound);
// app.use(errorHandler);
export default app;
