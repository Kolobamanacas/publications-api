export class UnableToCreateNewsReportError extends Error {
  public constructor(ids: string) {
    super(`Unable to create news report for given IDs: "${ids}".`);
  }
}
