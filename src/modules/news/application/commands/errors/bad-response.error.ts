export class BadResponseError extends Error {
  public constructor(url: string) {
    super(`Request to given URL "${url}" reterned error.`);
  }
}
