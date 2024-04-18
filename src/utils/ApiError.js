class ApiError extends Error {
  constructor(
    statusCode,
    message = "somting went wrong",
    errors = [],
    statck = ""
  ) {
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (this.statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    
  }
}
