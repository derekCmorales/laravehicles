import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewDatabases1772340007300 implements MigrationInterface {
  name = 'CreateNewDatabases1772340007300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "catalogo_iscv" ("codigo_iscv" character varying(30) NOT NULL, "marca" character varying(100) NOT NULL, "linea_estilo" character varying(100) NOT NULL, "tipo_vehiculo" character varying(50) NOT NULL, "valor_base" numeric(10,2) NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_35319eeed9b7bf514252bd0db64" PRIMARY KEY ("codigo_iscv"))`);
    await queryRunner.query(`CREATE TABLE "calcomania" ("id_calcomania" SERIAL NOT NULL, "no_calcomania" character varying(30) NOT NULL, "anio" integer NOT NULL, "estado" character varying(20) NOT NULL, "fecha_impresion" date NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "id_vehiculo" integer NOT NULL, "no_certificado_vigente" character varying(30) NOT NULL, "no_tarjeta_vigente" character varying(30) NOT NULL, CONSTRAINT "UQ_d3dbf60831a592ae91839eaa090" UNIQUE ("no_calcomania"), CONSTRAINT "PK_e988da11fe634bdf4e95553fe9d" PRIMARY KEY ("id_calcomania"))`);
    await queryRunner.query(`CREATE TABLE "certificado_propiedad" ("id_certificado_propiedad" SERIAL NOT NULL, "no_certificado" character varying(30) NOT NULL, "codigo_unico_identificador" character varying(50) NOT NULL, "fecha_emision" date NOT NULL, "aduana_liquidadora" character varying(255) NOT NULL, "poliza_importacion" character varying(50) NOT NULL, "fecha_poliza" date NOT NULL, "franquicia_no" integer NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "id_vehiculo" integer NOT NULL, CONSTRAINT "UQ_f36538db3f0c6215a9ef9b0ee60" UNIQUE ("no_certificado"), CONSTRAINT "UQ_5664d4b96407b06afef5ac036f8" UNIQUE ("codigo_unico_identificador"), CONSTRAINT "PK_1186d5a30c4e0b66408ef7d9be0" PRIMARY KEY ("id_certificado_propiedad"))`);
    await queryRunner.query(`CREATE TABLE "vehiculo" ("id_vehiculo" SERIAL NOT NULL, "placa" character varying(30) NOT NULL, "codigo_unico_identificador" character varying(50) NOT NULL, "uso" character varying(50) NOT NULL, "modelo" integer NOT NULL, "vin" character varying(50) NOT NULL, "serie" character varying(100) NOT NULL, "chasis" character varying(100) NOT NULL, "motor" character varying(100) NOT NULL, "centimetros_cubicos" integer NOT NULL, "asientos" integer NOT NULL, "cilindros" integer NOT NULL, "combustible" character varying(30) NOT NULL, "puertas" integer NOT NULL, "tonelaje" numeric(10,2) NOT NULL, "color" character varying(30) NOT NULL, "ejes" integer NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "codigo_iscv" character varying(30) NOT NULL, "id_usuario" integer NOT NULL, CONSTRAINT "UQ_c552e0abe606891face75e9c115" UNIQUE ("placa"), CONSTRAINT "UQ_7b9c88735c34c1c6d62dc2933ed" UNIQUE ("codigo_unico_identificador"), CONSTRAINT "UQ_dcea47890c2eb1dbfb4e7d7feac" UNIQUE ("vin"), CONSTRAINT "UQ_5d19f69514198bb354e5678e403" UNIQUE ("combustible"), CONSTRAINT "UQ_b2292c61aa3fa5e3841304dc914" UNIQUE ("color"), CONSTRAINT "PK_151f12779b5a696b17ace3e5806" PRIMARY KEY ("id_vehiculo"))`);
    await queryRunner.query(`CREATE TABLE "tarjeta_circulacion" ("id_tarjeta_circulacion" SERIAL NOT NULL, "no_tarjeta" character varying(30) NOT NULL, "fecha_registro" date NOT NULL, "aduana_liquidadora" character varying(255) NOT NULL, "validahasta" date NOT NULL, "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "fecha_actualizacion" TIMESTAMP NOT NULL DEFAULT now(), "id_vehiculo" integer NOT NULL, CONSTRAINT "UQ_38c05207c7051f41ace0b4e5684" UNIQUE ("no_tarjeta"), CONSTRAINT "PK_07c983fd35d3b976d760d234b2e" PRIMARY KEY ("id_tarjeta_circulacion"))`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_e0f90a1e002160291e264a0935e" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a" FOREIGN KEY ("no_certificado_vigente") REFERENCES "certificado_propiedad"("no_certificado") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "calcomania" ADD CONSTRAINT "FK_d2ae7c8474195d83669821c25c1" FOREIGN KEY ("no_tarjeta_vigente") REFERENCES "tarjeta_circulacion"("no_tarjeta") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" ADD CONSTRAINT "FK_5d7d6b49434d05735b5e5913a1f" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_b8bd47efef068f8ac4d39da76d0" FOREIGN KEY ("codigo_iscv") REFERENCES "catalogo_iscv"("codigo_iscv") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "vehiculo" ADD CONSTRAINT "FK_2ab33749a0169abbad15664790f" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" ADD CONSTRAINT "FK_6050b50cc90b8d1c6f025abcff7" FOREIGN KEY ("id_vehiculo") REFERENCES "vehiculo"("id_vehiculo") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tarjeta_circulacion" DROP CONSTRAINT "FK_6050b50cc90b8d1c6f025abcff7"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_2ab33749a0169abbad15664790f"`);
    await queryRunner.query(`ALTER TABLE "vehiculo" DROP CONSTRAINT "FK_b8bd47efef068f8ac4d39da76d0"`);
    await queryRunner.query(`ALTER TABLE "certificado_propiedad" DROP CONSTRAINT "FK_5d7d6b49434d05735b5e5913a1f"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_d2ae7c8474195d83669821c25c1"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_0f177efba72f5dc4e2359317b8a"`);
    await queryRunner.query(`ALTER TABLE "calcomania" DROP CONSTRAINT "FK_e0f90a1e002160291e264a0935e"`);
    await queryRunner.query(`DROP TABLE "tarjeta_circulacion"`);
    await queryRunner.query(`DROP TABLE "vehiculo"`);
    await queryRunner.query(`DROP TABLE "certificado_propiedad"`);
    await queryRunner.query(`DROP TABLE "calcomania"`);
    await queryRunner.query(`DROP TABLE "catalogo_iscv"`);
  }
}
