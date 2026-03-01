import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases31772342439307 implements MigrationInterface {
  name = 'CreateNewDatabases31772342439307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "UQ_5d19f69514198bb354e5678e403"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "UQ_b2292c61aa3fa5e3841304dc914"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "UQ_b2292c61aa3fa5e3841304dc914" UNIQUE ("color")`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "UQ_5d19f69514198bb354e5678e403" UNIQUE ("combustible")`);
  }
}
