export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown,
  ) {
    super(message);

    this.name = "ApiClientError";
  }
}