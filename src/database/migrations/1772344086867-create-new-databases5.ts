import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases51772344086867 implements MigrationInterface {
  name = 'CreateNewDatabases51772344086867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "UQ_d3dbf60831a592ae91839eaa090"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "no_calcomania"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "PK_1186d5a30c4e0b66408ef7d9be0"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP COLUMN "id_certificado_propiedad"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "PK_07c983fd35d3b976d760d234b2e"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP COLUMN "id_tarjeta_circulacion"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "PK_e988da11fe634bdf4e95553fe9d"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "id_calcomania"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "id_calcomania" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "PK_e988da11fe634bdf4e95553fe9d" PRIMARY KEY ("id_calcomania")`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "PK_f36538db3f0c6215a9ef9b0ee60" PRIMARY KEY ("no_certificado")`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "UQ_f36538db3f0c6215a9ef9b0ee60"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_d2ae7c8474195d83669821c25c1"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "PK_38c05207c7051f41ace0b4e5684" PRIMARY KEY ("no_tarjeta")`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "UQ_38c05207c7051f41ace0b4e5684"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a" FOREIGN KEY ("no_certificado_vigente") REFERENCES "certificado_propiedad"("no_certificado") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_d2ae7c8474195d83669821c25c1" FOREIGN KEY ("no_tarjeta_vigente") REFERENCES "tarjeta_circulacion"("no_tarjeta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_d2ae7c8474195d83669821c25c1"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a"`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "UQ_38c05207c7051f41ace0b4e5684" UNIQUE ("no_tarjeta")`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "PK_38c05207c7051f41ace0b4e5684"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_d2ae7c8474195d83669821c25c1" FOREIGN KEY ("no_tarjeta_vigente") REFERENCES "tarjeta_circulacion"("no_tarjeta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "UQ_f36538db3f0c6215a9ef9b0ee60" UNIQUE ("no_certificado")`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "PK_f36538db3f0c6215a9ef9b0ee60"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a" FOREIGN KEY ("no_certificado_vigente") REFERENCES "certificado_propiedad"("no_certificado") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "PK_e988da11fe634bdf4e95553fe9d"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP COLUMN "id_calcomania"`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "id_calcomania" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "PK_e988da11fe634bdf4e95553fe9d" PRIMARY KEY ("id_calcomania")`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD "id_tarjeta_circulacion" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "PK_07c983fd35d3b976d760d234b2e" PRIMARY KEY ("id_tarjeta_circulacion")`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD "id_certificado_propiedad" SERIAL NOT NULL`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "PK_1186d5a30c4e0b66408ef7d9be0" PRIMARY KEY ("id_certificado_propiedad")`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD "no_calcomania" character varying(30) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "UQ_d3dbf60831a592ae91839eaa090" UNIQUE ("no_calcomania")`);
  }
}
