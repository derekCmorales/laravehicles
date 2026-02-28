import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsuario1782896200000 implements MigrationInterface {
  name = 'InitUsuario1782896200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "rol" character varying(50) NOT NULL DEFAULT 'user', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_usuario_username" UNIQUE ("username"), CONSTRAINT "PK_usuario" PRIMARY KEY ("id_usuario"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "usuario"`);
  }
}
