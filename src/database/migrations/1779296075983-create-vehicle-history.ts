import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVehicleHistory1779296075983 implements MigrationInterface {
    name = 'CreateVehicleHistory1779296075983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "historial_vehiculo" ("id" SERIAL NOT NULL, "datos_anteriores" json, "datos_nuevos" json, "tipo_cambio" character varying(100) NOT NULL, "fecha_cambio" TIMESTAMP NOT NULL DEFAULT now(), "placa" character varying(30) NOT NULL, "id_usuario" integer, CONSTRAINT "PK_eb2b9ae367d16230da7c2933951" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "historial_vehiculo" ADD CONSTRAINT "FK_610cea0590abd1e542d840fb9ca" FOREIGN KEY ("placa") REFERENCES "vehiculo"("placa") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "historial_vehiculo" ADD CONSTRAINT "FK_46184d3f1966be58afb4270f826" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "historial_vehiculo" DROP CONSTRAINT "FK_46184d3f1966be58afb4270f826"`);
        await queryRunner.query(`ALTER TABLE "historial_vehiculo" DROP CONSTRAINT "FK_610cea0590abd1e542d840fb9ca"`);
        await queryRunner.query(`DROP TABLE "historial_vehiculo"`);
    }

}
