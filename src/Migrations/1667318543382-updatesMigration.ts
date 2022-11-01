import { MigrationInterface, QueryRunner } from "typeorm";

export class updatesMigration1667318543382 implements MigrationInterface {
    name = 'updatesMigration1667318543382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospital" ADD "cnpj" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hospital" DROP COLUMN "cnpj"`);
    }

}
