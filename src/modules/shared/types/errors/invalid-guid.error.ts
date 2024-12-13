export class InvalidGuidError extends Error {
  public constructor(value: string) {
    super(`Value "${value}" is not a valid GUID.`);
  }
}
