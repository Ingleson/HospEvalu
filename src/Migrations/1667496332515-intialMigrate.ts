import { MigrationInterface, QueryRunner } from "typeorm";

export class intialMigrate1667496332515 implements MigrationInterface {
    name = 'intialMigrate1667496332515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "professionalId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "professionalId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
    }

}
