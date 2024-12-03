export class UnableToMapNewsDbEntityError extends Error {
  public constructor(id: string, url: string, title: string) {
    super(
      `Unable to create New domain entity with ID "${id}", url "${url}" and title "${title}".`,
    );
  }
}
