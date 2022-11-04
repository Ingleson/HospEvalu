import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigrate1667579653211 implements MigrationInterface {
    name = 'initialMigrate1667579653211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646"`);
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4"`);
        await queryRunner.query(`ALTER TABLE "service_type" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646"`);
        await queryRunner.query(`ALTER TABLE "service_type" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
