import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases21772341387088 implements MigrationInterface {
  name = 'CreateNewDatabases21772341387088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_e0f90a1e002160291e264a0935e"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_2ab33749a0169abbad15664790f"`);
    await queryRunner.query(`ALTER TABLE "calcomania" RENAME COLUMN "id_vehiculo" TO "placa"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" RENAME COLUMN "id_usuario" TO "nit"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "placa" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "nit"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD "nit" character varying(20) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_b712f3015399f7742997c47fced" FOREIGN KEY ("nit") REFERENCES "contribuyente"("nit") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_b712f3015399f7742997c47fced"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "nit"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD "nit" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "placa" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" RENAME COLUMN "nit" TO "id_usuario"`);
    await queryRunner.query(`ALTER TABLE "calcomania" RENAME COLUMN "placa" TO "id_vehiculo"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_2ab33749a0169abbad15664790f" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_e0f90a1e002160291e264a0935e" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
