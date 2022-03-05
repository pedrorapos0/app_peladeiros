class AppError {
  readonly statusCode: number;
  readonly message: string;

  constructor(message: string, statusCode = 400) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;
