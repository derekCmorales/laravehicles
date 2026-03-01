import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases41772342872121 implements MigrationInterface {
  name = 'CreateNewDatabases41772342872121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "FK_5d7d6b49434d05735b5e5913a1f"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "FK_6050b50cc90b8d1c6f025abcff7"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" RENAME COLUMN "id_vehiculo" TO "placa"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" RENAME COLUMN "id_vehiculo" TO "placa"`);
    await queryRunner.query(`ALTER TABLE "contribuyente" DROP CONSTRAINT "PK_66f24569664a16bfb46d4539611"`);
    await queryRunner.query(`ALTER TABLE "contribuyente" DROP COLUMN "id_contribuyente"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "PK_151f12779b5a696b17ace3e5806"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP COLUMN "id_vehiculo"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD "placa" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_b712f3015399f7742997c47fced"`);
    await queryRunner.query(`ALTER TABLE "contribuyente" ADD CONSTRAINT "PK_b829a4723ec4a82976d2fe5d5be" PRIMARY KEY ("nit")`);
    await queryRunner.query(`ALTER TABLE "contribuyente" DROP CONSTRAINT "UQ_b829a4723ec4a82976d2fe5d5be"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "PK_c552e0abe606891face75e9c115" PRIMARY KEY ("placa")`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "UQ_c552e0abe606891face75e9c115"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD "placa" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "FK_cb568567d9aebae78465c128680" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_b712f3015399f7742997c47fced" FOREIGN KEY ("nit") REFERENCES "contribuyente"("nit") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "FK_770c6b9b8ba6ac44a497ebc4eaa" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "FK_770c6b9b8ba6ac44a497ebc4eaa"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_b712f3015399f7742997c47fced"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "FK_cb568567d9aebae78465c128680"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD "placa" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "UQ_c552e0abe606891face75e9c115" UNIQUE ("placa")`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "PK_c552e0abe606891face75e9c115"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_95d70dcfadf4f8e068c093019cc" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "contribuyente" ADD CONSTRAINT "UQ_b829a4723ec4a82976d2fe5d5be" UNIQUE ("nit")`);
    await queryRunner.query(`ALTER TABLE "contribuyente" DROP CONSTRAINT "PK_b829a4723ec4a82976d2fe5d5be"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_b712f3015399f7742997c47fced" FOREIGN KEY ("nit") REFERENCES "contribuyente"("nit") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP COLUMN "placa"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD "placa" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD "id_vehiculo" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "PK_151f12779b5a696b17ace3e5806" PRIMARY KEY ("id_vehiculo")`);
    await queryRunner.query(`ALTER TABLE "contribuyente" ADD "id_contribuyente" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "contribuyente" ADD CONSTRAINT "PK_66f24569664a16bfb46d4539611" PRIMARY KEY ("id_contribuyente")`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" RENAME COLUMN "placa" TO "id_vehiculo"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" RENAME COLUMN "placa" TO "id_vehiculo"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "FK_6050b50cc90b8d1c6f025abcff7" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "FK_5d7d6b49434d05735b5e5913a1f" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }
}
