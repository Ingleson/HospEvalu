import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1667525872333 implements MigrationInterface {
    name = 'createTable1667525872333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3"`);
        await queryRunner.query(`CREATE TABLE "users_schedules_schedules" ("usersId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_cb2ef564112384a053c12a9e1c9" PRIMARY KEY ("usersId", "schedulesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7da359c2e66a653eef8a6f054c" ON "users_schedules_schedules" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_769d9228bbd2ab82123b10c6ea" ON "users_schedules_schedules" ("schedulesId") `);
        await queryRunner.query(`CREATE TABLE "professional_schedules_schedules" ("professionalId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_679a0e3ea27d4a1742c60e2467d" PRIMARY KEY ("professionalId", "schedulesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c297424771463224b85e60036" ON "professional_schedules_schedules" ("professionalId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd1d7e698cd0ee5a6168d4da80" ON "professional_schedules_schedules" ("schedulesId") `);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "professionalId"`);
        await queryRunner.query(`ALTER TABLE "users_schedules_schedules" ADD CONSTRAINT "FK_7da359c2e66a653eef8a6f054ce" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_schedules_schedules" ADD CONSTRAINT "FK_769d9228bbd2ab82123b10c6eae" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professional_schedules_schedules" ADD CONSTRAINT "FK_0c297424771463224b85e600367" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "professional_schedules_schedules" ADD CONSTRAINT "FK_dd1d7e698cd0ee5a6168d4da807" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professional_schedules_schedules" DROP CONSTRAINT "FK_dd1d7e698cd0ee5a6168d4da807"`);
        await queryRunner.query(`ALTER TABLE "professional_schedules_schedules" DROP CONSTRAINT "FK_0c297424771463224b85e600367"`);
        await queryRunner.query(`ALTER TABLE "users_schedules_schedules" DROP CONSTRAINT "FK_769d9228bbd2ab82123b10c6eae"`);
        await queryRunner.query(`ALTER TABLE "users_schedules_schedules" DROP CONSTRAINT "FK_7da359c2e66a653eef8a6f054ce"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "professionalId" uuid`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dd1d7e698cd0ee5a6168d4da80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c297424771463224b85e60036"`);
        await queryRunner.query(`DROP TABLE "professional_schedules_schedules"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_769d9228bbd2ab82123b10c6ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7da359c2e66a653eef8a6f054c"`);
        await queryRunner.query(`DROP TABLE "users_schedules_schedules"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
