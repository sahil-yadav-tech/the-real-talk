// errors/NotFoundError.js


class NotFoundError extends Error {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export default NotFoundError;