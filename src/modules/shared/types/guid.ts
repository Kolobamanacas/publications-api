import { InvalidGuidError } from '@shared/types/errors/invalid-guid.error';
import { validate, v4 } from 'uuid';

export class Guid {
  private constructor(private readonly props: { value: string }) {}

  public get value(): string {
    return this.props.value;
  }

  public static create(value: string): Guid {
    if (!validate(value)) {
      throw new InvalidGuidError(value);
    }

    return new Guid({ value });
  }

  public static generate(): Guid {
    return new Guid({ value: v4() });
  }

  public static isGuid(value: string): boolean {
    return validate(value);
  }
}
