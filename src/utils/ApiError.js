class ApiError extends Error {
  constructor(
    statusCode,
    message = "somting went wrong",
    errors = [],
    stack = ""
  ) {
    super()
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (this.stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    
  }
}

export {ApiError}
