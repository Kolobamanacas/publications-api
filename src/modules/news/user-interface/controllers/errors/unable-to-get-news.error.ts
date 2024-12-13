export class UnableToGetNewsError extends Error {
  public constructor() {
    super(`Unable to get news.`);
  }
}
