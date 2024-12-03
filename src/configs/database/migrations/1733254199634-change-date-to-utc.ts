import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDateToUtc1733254199634 implements MigrationInterface {
  public name = 'ChangeDateToUtc1733254199634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "News" DROP COLUMN "CreatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "News" ADD "CreatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "News" DROP COLUMN "UpdatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "News" ADD "UpdatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "News" DROP COLUMN "UpdatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "News" ADD "UpdatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "News" DROP COLUMN "CreatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "News" ADD "CreatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }
}
