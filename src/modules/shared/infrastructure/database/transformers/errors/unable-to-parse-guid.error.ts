export class UnableToParseGuidError extends Error {
  public constructor(guidValue: string) {
    super(`String "${guidValue}" is not a proper GUID.`);
  }
}
