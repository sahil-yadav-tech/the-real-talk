// // packages/common/response/sendResponse.js
// import { logger } from '../logger/index.js';

// // ==========================================
// // MAIN FUNCTION - Jo response bhejta hai
// // ==========================================
// export const sendResponse = (res, statusCode, message, data = null, errors = null, meta = null) => {
  
//   // 1. Response banayein
//   const response = {
//     success: statusCode >= 200 && statusCode < 300,
//     message: message,
//   };

//   // 2. Agar data hai toh add karein
//   if (data) {
//     response.data = data;
//   }

//   // 3. Agar errors hain toh add karein
//   if (errors) {
//     response.errors = errors;
//   }

//   // 4. Meta data add karein
//   response.meta = {
//     timestamp: new Date().toISOString(),
//     service: process.env.SERVICE_NAME || 'unknown',
//   };

//   // 5. Request ID add karein agar hai toh
//   const requestId = res.get('x-request-id');
//   if (requestId) {
//     response.meta.requestId = requestId;
//   }

//   // 6. Correlation ID add karein agar hai toh
//   const correlationId = res.get('x-correlation-id');
//   if (correlationId) {
//     response.meta.correlationId = correlationId;
//   }

//   // 7. Custom meta add karein agar hai toh
//   if (meta) {
//     for (let key in meta) {
//       response.meta[key] = meta[key];
//     }
//   }

//   // 8. Agar error hai toh log karein
//   if (statusCode >= 400) {
//     logger.error({
//       message: 'Error response sent',
//       statusCode: statusCode,
//       path: res.req?.path,
//       method: res.req?.method,
//     });
//   }

//   // 9. Response bhejein
//   return res.status(statusCode).json(response);
// };

// // ==========================================
// // SUCCESS - Jab sab theek ho (200)
// // ==========================================
// export const successResponse = (res, message = 'Success', data = null, statusCode = 200, meta = null) => {
//   return sendResponse(res, statusCode, message, data, null, meta);
// };

// // ==========================================
// // CREATED - Jab naya resource bane (201)
// // ==========================================
// export const createdResponse = (res, message = 'Created successfully', data = null, meta = null) => {
//   return sendResponse(res, 201, message, data, null, meta);
// };

// // ==========================================
// // ERROR - Jab kuch galat ho (400, 404, 500, etc.)
// // ==========================================
// export const errorResponse = (res, message = 'Something went wrong', statusCode = 500, errors = null, meta = null) => {
//   return sendResponse(res, statusCode, message, null, errors, meta);
// };

// // ==========================================
// // NO CONTENT - Jab kuch return nahi karna (204)
// // ==========================================
// export const noContentResponse = (res) => {
//   return res.status(204).send();
// };





// packages/common/response/sendResponse.js

export const successResponse = (
  res,
  message,
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res,
  message,
  statusCode = 500
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};