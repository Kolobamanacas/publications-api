import {
  DefaultNamingStrategy,
  NamingStrategyInterface,
  Table,
  View,
} from 'typeorm';
import { camelCase } from 'typeorm/util/StringUtils';

const keyNameLenghtCap = 60;

const getTableName = (tableOrName: Table | string): string => {
  const tableFullName =
    typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

  const tableNameArray = tableFullName.split('.');

  return tableNameArray[tableNameArray.length - 1];
};

export class CamelCaseNamingStrategy
  extends DefaultNamingStrategy
  implements NamingStrategyInterface
{
  name?: string | undefined;

  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName || camelCase(targetName, true);
  }

  closureJunctionTableName(originalClosureTableName: string): string {
    return `${camelCase(originalClosureTableName, true)}_closure`;
  }

  columnName(
    propertyName: string,
    customName: string | undefined,
    embeddedPrefixes: string[],
  ): string {
    return (
      embeddedPrefixes.join('_') +
      (customName !== undefined ? customName : camelCase(propertyName, true))
    );
  }

  relationName(propertyName: string): string {
    return camelCase(propertyName, true);
  }

  primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
    const tableName = camelCase(getTableName(tableOrName), true);

    const columnsNames =
      columnNames.length === 0
        ? ''
        : `_${[...columnNames]
            .sort()
            .map((name) => camelCase(name, true))
            .join('_')}`;

    return `PK_${tableName}${columnsNames}`.slice(0, keyNameLenghtCap);
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const tableName = getTableName(tableOrName);

    const columnsNames =
      columnNames.length === 0
        ? ''
        : `_${[...columnNames]
            .sort()
            .map((name) => camelCase(name, true))
            .join('_')}`;

    return `UC_${camelCase(tableName, true)}${columnsNames}`.slice(
      0,
      keyNameLenghtCap,
    );
  }

  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    const tableName = camelCase(getTableName(tableOrName), true);
    const columnsNames = `__${[...columnNames]
      .sort()
      .map((name) => camelCase(name, true))
      .join('_')}`;
    const whereName = where === undefined ? '' : `__${where}`;

    return `REL_${tableName}${columnsNames}${whereName}`;
  }

  defaultConstraintName(
    tableOrName: Table | string,
    columnName: string,
  ): string {
    const tableName = getTableName(tableOrName);

    return `DF_${camelCase(tableName, true)}_${camelCase(columnName, true)}`;
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath?: string,
    referencedColumnNames?: string[],
  ): string {
    const tableName = getTableName(tableOrName);

    const columnsNames =
      columnNames.length === 0
        ? ''
        : `_${[...columnNames]
            .sort()
            .map((name) => camelCase(name, true))
            .join('_')}`;

    const referencedTableName =
      referencedTablePath === undefined
        ? ''
        : `__${camelCase(referencedTablePath, true)}`;

    const referencedColumnsNames =
      referencedColumnNames !== undefined && referencedColumnNames.length > 0
        ? `_${referencedColumnNames.map((name) => camelCase(name, true)).join('_')}`
        : '';

    return `FK_${camelCase(tableName, true)}${columnsNames}${referencedTableName}${referencedColumnsNames}`.slice(
      0,
      keyNameLenghtCap,
    );
  }

  indexName(
    tableOrName: Table | View | string,
    columns: string[],
    _where?: string,
  ): string {
    const tableName =
      typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const columnsNames =
      columns.length === 0
        ? ''
        : `_${[...columns]
            .sort()
            .map((name) => camelCase(name, true))
            .join('_')}`;

    return `IDX_${camelCase(tableName, true)}${columnsNames}`.slice(
      0,
      keyNameLenghtCap,
    );
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return `${camelCase(relationName, true)}_${camelCase(referencedColumnName, true)}`;
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return `${camelCase(firstTableName, true)}_${camelCase(firstPropertyName, true)}__${camelCase(secondTableName, true)}_${camelCase(secondPropertyName, true)}`;
  }

  joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
    return `${camelCase(columnName, true)}_${index}`;
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    const joinName =
      columnName === undefined
        ? camelCase(propertyName, true)
        : `${camelCase(columnName, true)}_${camelCase(propertyName, true)}`;

    return `${camelCase(tableName, true)}_${joinName}`;
  }

  joinTableInverseColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    const joinName =
      columnName === undefined
        ? camelCase(propertyName, true)
        : `${camelCase(columnName, true)}_${camelCase(propertyName, true)}`;

    return `${camelCase(tableName, true)}_${joinName}`;
  }

  prefixTableName(prefix: string, tableName: string): string {
    return `${camelCase(prefix, true)}_${camelCase(tableName, true)}`;
  }
}
