// // packages/common/errors/AppError.js
// export class AppError extends Error {
//   constructor(message, statusCode, isOperational = true, errorCode = null) {
//     super(message);
    
//     // Error properties
//     this.statusCode = statusCode;
//     this.isOperational = isOperational;
//     this.errorCode = errorCode || `ERR_${statusCode}`;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.timestamp = new Date().toISOString();
    
//     // Capture stack trace
//     Error.captureStackTrace(this, this.constructor);
    
//     // For debugging - but never expose in production
//     if (process.env.NODE_ENV !== 'production') {
//       this.stack = this.stack;
//     }
//   }

//   // Helper method to format error for response
//   toJSON() {
//     return {
//       success: false,
//       message: this.message,
//       errorCode: this.errorCode,
//       statusCode: this.statusCode,
//       timestamp: this.timestamp,
//       ...(process.env.NODE_ENV !== 'production' && { stack: this.stack })
//     };
//   }
// }



// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message);

//     this.message = message;
//     this.statusCode = statusCode;
//   }
// }

// export default AppError;


class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;