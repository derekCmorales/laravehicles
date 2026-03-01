import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileTaxpayer1772328959456 implements MigrationInterface {
    name = 'CreateProfileTaxpayer1772328959456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contribuyente" ("id_contribuyente" SERIAL NOT NULL, "nit" character varying(20) NOT NULL, "cui" character varying(20) NOT NULL, "nombre_empresa" character varying(50), "segundo_nombre" character varying(50) NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "id_perfil" integer NOT NULL, CONSTRAINT "UQ_b829a4723ec4a82976d2fe5d5be" UNIQUE ("nit"), CONSTRAINT "UQ_28935235b7d013dac54cee70e70" UNIQUE ("cui"), CONSTRAINT "REL_31c170af7969470bcb8a0d7539" UNIQUE ("id_perfil"), CONSTRAINT "PK_66f24569664a16bfb46d4539611" PRIMARY KEY ("id_contribuyente"))`);
        await queryRunner.query(`CREATE TABLE "perfil" ("id_perfil" SERIAL NOT NULL, "primer_nombre" character varying(50) NOT NULL, "segundo_nombre" character varying(50), "primer_apellido" character varying(50) NOT NULL, "segundo_apellido" character varying(50), "fecha_nacimiento" date NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "id_usuario" integer NOT NULL, CONSTRAINT "REL_4f728b134716ee028b716f84cd" UNIQUE ("id_usuario"), CONSTRAINT "PK_79181da5d8898aa87d57118dbf1" PRIMARY KEY ("id_perfil"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "rol" character varying(50) NOT NULL DEFAULT 'user', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username"), CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`);
        await queryRunner.query(`ALTER TABLE "contribuyente" ADD CONSTRAINT "FK_31c170af7969470bcb8a0d7539f" FOREIGN KEY ("id_perfil") REFERENCES "perfil"("id_perfil") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perfil" ADD CONSTRAINT "FK_4f728b134716ee028b716f84cdf" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "perfil" DROP CONSTRAINT "FK_4f728b134716ee028b716f84cdf"`);
        await queryRunner.query(`ALTER TABLE "contribuyente" DROP CONSTRAINT "FK_31c170af7969470bcb8a0d7539f"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "perfil"`);
        await queryRunner.query(`DROP TABLE "contribuyente"`);
    }

}
