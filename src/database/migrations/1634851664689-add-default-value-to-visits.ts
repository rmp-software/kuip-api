import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultValueToVisits1634851664689
  implements MigrationInterface
{
  name = 'addDefaultValueToVisits1634851664689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "urls" ALTER COLUMN "visits" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "urls" ALTER COLUMN "visits" DROP DEFAULT`,
    );
  }
}
