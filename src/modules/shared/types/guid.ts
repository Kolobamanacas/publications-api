import { validate, v4 } from 'uuid';

export class Guid {
  private constructor(private readonly props: { value: string }) {}

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): Guid | null {
    if (!validate(value)) {
      return null;
    }

    return new Guid({ value });
  }

  public static generate(): Guid {
    return new Guid({ value: v4() });
  }
}
