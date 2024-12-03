import { CamelCaseNamingStrategy } from '@configs/database/camel-case-naming-strategy';
import { DataSourceOptions } from 'typeorm';
import { DatabaseEnv } from '@configs/environment-variables/env-configs/database.env';
import { Inject } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { databaseEntities } from '@configs/database/entities';
import { databaseMigrations } from '@configs/database/migrations';

export class DatabaseConfig implements TypeOrmOptionsFactory {
  public constructor(@Inject(DatabaseEnv) private readonly env: DatabaseEnv) {}

  createTypeOrmOptions(): DataSourceOptions {
    return {
      database: this.env.DATABASE_DATABASE_NAME,
      entities: databaseEntities,
      host: this.env.DATABASE_HOST,
      migrations: databaseMigrations,
      migrationsRun: false,
      namingStrategy: new CamelCaseNamingStrategy(),
      password: this.env.DATABASE_PASSWORD,
      port: this.env.DATABASE_PORT,
      type: 'postgres',
      username: this.env.DATABASE_USERNAME,
    };
  }
}
