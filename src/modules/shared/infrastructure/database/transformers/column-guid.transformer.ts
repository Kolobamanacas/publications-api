import { Guid } from '@shared/types/guid';
import { FindOperator, ValueTransformer } from 'typeorm';

export class ColumnGuidTransformer implements ValueTransformer {
  from(valueFromDatabase: string | null): Guid | null {
    if (valueFromDatabase === null) {
      return null;
    }

    return Guid.create(valueFromDatabase);
  }

  to(
    valueFromApplication: Guid | FindOperator<Guid> | null | undefined,
  ): string | FindOperator<string> | null {
    if (valueFromApplication === null || valueFromApplication === undefined) {
      return null;
    }

    if (valueFromApplication instanceof FindOperator) {
      return new FindOperator<string>(
        valueFromApplication.type,
        valueFromApplication.value.value,
        valueFromApplication.useParameter,
        valueFromApplication.multipleParameters,
        valueFromApplication.getSql,
        valueFromApplication.objectLiteralParameters,
      );
    }

    return valueFromApplication.value;
  }
}
