export class InvalidUrlError extends Error {
  public constructor(value: string) {
    super(`Value "${value}" is not a valid URL.`);
  }
}
