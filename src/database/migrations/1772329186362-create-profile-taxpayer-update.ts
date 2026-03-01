import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileTaxpayerUpdate1772329186362 implements MigrationInterface {
    name = 'CreateProfileTaxpayerUpdate1772329186362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribuyente" RENAME COLUMN "segundo_nombre" TO "domicilio_fiscal"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contribuyente" RENAME COLUMN "domicilio_fiscal" TO "segundo_nombre"`);
    }

}
