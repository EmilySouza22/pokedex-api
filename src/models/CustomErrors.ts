export class APIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";
  }
}
