// @ts-nocheck
export class RuntimeException extends Error {
  message;
  constructor(message = '') {
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, RuntimeException.prototype);
  }
}
