import { Guid } from '@shared/types/guid';
import { InvalidGuidError } from '@shared/user-interface/validators/errors/invalid-guid.error';
import { NoValueReceivedError } from '@shared/user-interface/validators/errors/no-value-received.error';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
class IsGuidConstraint implements ValidatorConstraintInterface {
  validate(
    value: string | Guid,
    _validationArguments?: ValidationArguments,
  ): boolean {
    // NestJS's policy is to tranform data before validate, hence if value is already successfully transformed we pass validation.
    if (value instanceof Guid) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    return Guid.isGuid(value);
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const valueToTransform = validationArguments?.value?.value;

    if (validationArguments === undefined || valueToTransform === undefined) {
      return String(new NoValueReceivedError());
    }

    const errorValues = this.parseErrorvalue(valueToTransform);

    return String(new InvalidGuidError(errorValues));
  }

  private parseErrorvalue(value: unknown | unknown[]): string {
    if (typeof value === 'object' || Array.isArray(value)) {
      return JSON.stringify(value);
    }

    return `"${String(value)}"`;
  }
}

export function IsGuid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsGuid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsGuidConstraint,
    });
  };
}
