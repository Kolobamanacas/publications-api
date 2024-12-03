import { Guid } from '@shared/types/guid';
import { UnableToParseGuidError } from '@shared/infrastructure/database/transformers/errors/unable-to-parse-guid.error';
import { FindOperator, ValueTransformer } from 'typeorm';

export class ColumnGuidTransformer implements ValueTransformer {
  from(valueFromDatabase: string | null): Guid | null {
    if (valueFromDatabase === null) {
      return null;
    }

    const guid = Guid.create(valueFromDatabase);

    if (guid === null) {
      throw new UnableToParseGuidError(valueFromDatabase);
    }

    return guid;
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
