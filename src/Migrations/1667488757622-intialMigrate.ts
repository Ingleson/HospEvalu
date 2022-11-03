import { MigrationInterface, QueryRunner } from "typeorm";

export class intialMigrate1667488757622 implements MigrationInterface {
    name = 'intialMigrate1667488757622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules_user_users" ("schedulesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_4ee244b7a8e60d4b5403a90aabc" PRIMARY KEY ("schedulesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2aae96c036b05d25146abd037" ON "schedules_user_users" ("schedulesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_291219b6e2c074f5d9d4c77de5" ON "schedules_user_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "schedules_professional_professional" ("schedulesId" uuid NOT NULL, "professionalId" uuid NOT NULL, CONSTRAINT "PK_725c5e331b8de87e08fb5ef0496" PRIMARY KEY ("schedulesId", "professionalId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9074d4b19a01f355c10da9464" ON "schedules_professional_professional" ("schedulesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_17e6743939816527acac227e21" ON "schedules_professional_professional" ("professionalId") `);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" ADD CONSTRAINT "FK_f2aae96c036b05d25146abd0373" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" ADD CONSTRAINT "FK_291219b6e2c074f5d9d4c77de56" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" ADD CONSTRAINT "FK_b9074d4b19a01f355c10da94643" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" ADD CONSTRAINT "FK_17e6743939816527acac227e21d" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" DROP CONSTRAINT "FK_17e6743939816527acac227e21d"`);
        await queryRunner.query(`ALTER TABLE "schedules_professional_professional" DROP CONSTRAINT "FK_b9074d4b19a01f355c10da94643"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" DROP CONSTRAINT "FK_291219b6e2c074f5d9d4c77de56"`);
        await queryRunner.query(`ALTER TABLE "schedules_user_users" DROP CONSTRAINT "FK_f2aae96c036b05d25146abd0373"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17e6743939816527acac227e21"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9074d4b19a01f355c10da9464"`);
        await queryRunner.query(`DROP TABLE "schedules_professional_professional"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_291219b6e2c074f5d9d4c77de5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2aae96c036b05d25146abd037"`);
        await queryRunner.query(`DROP TABLE "schedules_user_users"`);
    }

}
