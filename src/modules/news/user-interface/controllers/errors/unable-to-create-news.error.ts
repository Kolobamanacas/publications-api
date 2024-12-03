export class UnableToCreateNewsError extends Error {
  public constructor(url: string) {
    super(`Unable to create news for given URL: "${url}".`);
  }
}
