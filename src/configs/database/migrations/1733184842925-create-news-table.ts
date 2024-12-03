import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewsTable1733184842925 implements MigrationInterface {
  public name = 'CreateNewsTable1733184842925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "News" ("Id" uuid NOT NULL DEFAULT uuid_generate_v4(), "CreatedAt" TIMESTAMP NOT NULL DEFAULT now(), "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "Url" character varying NOT NULL, "Title" character varying NOT NULL, CONSTRAINT "PK_News_Id" PRIMARY KEY ("Id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "News"`);
  }
}
