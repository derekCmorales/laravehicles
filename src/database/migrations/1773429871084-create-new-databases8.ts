import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewDatabases81773429871084 implements MigrationInterface {
    name = 'CreateNewDatabases81773429871084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calcomania" ALTER COLUMN "estado" SET DEFAULT 'PENDIENTE'`);
        await queryRunner.query(`ALTER TABLE "calcomania" ALTER COLUMN "fecha_impresion" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "calcomania" ALTER COLUMN "fecha_impresion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "calcomania" ALTER COLUMN "estado" DROP DEFAULT`);
    }

}
