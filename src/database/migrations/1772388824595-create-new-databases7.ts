import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases71772388824595 implements MigrationInterface {
  name = 'CreateNewDatabases71772388824595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."vehiculo_estado_enum" AS ENUM('ACTIVO', 'INACTIVO_ADMINISTRATIVO', 'ROBADO', 'DESTRUIDO')`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD "estado" "public"."vehiculo_estado_enum" NOT NULL DEFAULT 'ACTIVO'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "estado"`);
    await queryRunner.query(`DROP TYPE "public"."vehiculo_estado_enum"`);
  }
}
