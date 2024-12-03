export class InvalidUrlError extends Error {
  public constructor(url: string) {
    super(`Given string "${url}" is not a valid URL.`);
  }
}
