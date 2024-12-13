export class InvalidGuidError extends Error {
  public constructor(value: string) {
    super(`Value (or set of values) "${value}" is not a valid GUID.`);
  }
}
