class appError extends Error {
  constructor() {
    super();
  }
  create(message, statusCode) {
    this.statusCode = statusCode;
    this.message = message;
    return this;
  }
}
export default new appError();
