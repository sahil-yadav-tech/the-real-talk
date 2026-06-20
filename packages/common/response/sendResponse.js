// packages/common/response/sendResponse.js
import { logger } from '../logger/index.js';

/**
 * Unified response structure for all services
 * Production-grade with proper logging and security
 */
export const sendResponse = (
  res,
  statusCode,
  message,
  data = null,
  errors = null,
  meta = null
) => {
  // Build response object
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    errors,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: res.get('x-request-id') || null,
      correlationId: res.get('x-correlation-id') || null,
      service: process.env.SERVICE_NAME || 'unknown',
      ...meta,
    },
  };

  // Clean up null/undefined values
  if (!response.data) delete response.data;
  if (!response.errors) delete response.errors;
  if (!response.meta.requestId) delete response.meta.requestId;
  if (!response.meta.correlationId) delete response.meta.correlationId;

  // Log response for monitoring
  if (statusCode >= 400) {
    logger.error({
      message: 'Error response sent',
      statusCode,
      path: res.req?.path,
      method: res.req?.method,
      correlationId: response.meta.correlationId,
    });
  }

  return res.status(statusCode).json(response);
};

// Success response helper
export const successResponse = (
  res,
  message = 'Success',
  data = null,
  statusCode = 200,
  meta = null
) => sendResponse(res, statusCode, message, data, null, meta);

// Error response helper
export const errorResponse = (
  res,
  message = 'Something went wrong',
  statusCode = 500,
  errors = null,
  meta = null
) => sendResponse(res, statusCode, message, null, errors, meta);

// Created response (201)
export const createdResponse = (
  res,
  message = 'Resource created successfully',
  data = null,
  meta = null
) => successResponse(res, message, data, 201, meta);

// No content response (204)
export const noContentResponse = (res) => {
  return res.status(204).send();
};