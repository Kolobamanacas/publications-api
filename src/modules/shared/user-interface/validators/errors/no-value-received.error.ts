export class NoValueReceivedError extends Error {
  public constructor() {
    super(`No value to be processed received.`);
  }
}
