// auth-service/src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { config } from './config/index.js';
import authRoutes from './routes/auth.routes.js';
import { correlationId } from '../../../packages/common/middlewares/correlationId.js';
import { notFoundHandler } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from '../../../packages/common/middlewares/requestLogger.js';

const app = express();

// ===== SECURITY & PERFORMANCE MIDDLEWARES =====
// Order matters!

// 1. Security headers
app.use(helmet());

// 2. CORS
app.use(cors({
  origin: config.allowedOrigins,
  credentials: true,
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
}));

// 3. Compression
app.use(compression());

// 4. Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ===== REQUEST TRACKING =====
// 5. Correlation ID (from common)
app.use(correlationId());

// 6. Request logging (from common)
app.use(requestLogger);

// ===== HEALTH CHECK =====
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'auth-service',
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ===== API ROUTES =====
app.use('/api/v1/auth', authRoutes);

// ===== ERROR HANDLING (MUST BE LAST) =====
// app.use(notFoundHandler);  // 404 handler
// app.use(errorHandler);     // Global error handler

export default app;