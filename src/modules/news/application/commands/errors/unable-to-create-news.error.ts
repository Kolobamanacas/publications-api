export class UnableToCreateNewsError extends Error {
  public constructor(url: string, title: string) {
    super(`Unable to create news for given URL "${url}" and title "${title}".`);
  }
}
