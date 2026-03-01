import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases61772345105429 implements MigrationInterface {
  name = 'CreateNewDatabases61772345105429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "fecha_impresion"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "fecha_impresion" TIMESTAMP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP COLUMN "fecha_registro"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD "fecha_registro" TIMESTAMP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP COLUMN "fecha_registro"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD "fecha_registro" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "fecha_impresion"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "fecha_impresion" date NOT NULL`);
  }
}
