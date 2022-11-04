"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTable1667525872333 = void 0;
class createTable1667525872333 {
    constructor() {
        this.name = 'createTable1667525872333';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
            yield queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3"`);
            yield queryRunner.query(`CREATE TABLE "users_schedules_schedules" ("usersId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_cb2ef564112384a053c12a9e1c9" PRIMARY KEY ("usersId", "schedulesId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_7da359c2e66a653eef8a6f054c" ON "users_schedules_schedules" ("usersId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_769d9228bbd2ab82123b10c6ea" ON "users_schedules_schedules" ("schedulesId") `);
            yield queryRunner.query(`CREATE TABLE "professional_schedules_schedules" ("professionalId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_679a0e3ea27d4a1742c60e2467d" PRIMARY KEY ("professionalId", "schedulesId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_0c297424771463224b85e60036" ON "professional_schedules_schedules" ("professionalId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_dd1d7e698cd0ee5a6168d4da80" ON "professional_schedules_schedules" ("schedulesId") `);
            yield queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
            yield queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "professionalId"`);
            yield queryRunner.query(`ALTER TABLE "users_schedules_schedules" ADD CONSTRAINT "FK_7da359c2e66a653eef8a6f054ce" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "users_schedules_schedules" ADD CONSTRAINT "FK_769d9228bbd2ab82123b10c6eae" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "professional_schedules_schedules" ADD CONSTRAINT "FK_0c297424771463224b85e600367" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "professional_schedules_schedules" ADD CONSTRAINT "FK_dd1d7e698cd0ee5a6168d4da807" FOREIGN KEY ("schedulesId") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "professional_schedules_schedules" DROP CONSTRAINT "FK_dd1d7e698cd0ee5a6168d4da807"`);
            yield queryRunner.query(`ALTER TABLE "professional_schedules_schedules" DROP CONSTRAINT "FK_0c297424771463224b85e600367"`);
            yield queryRunner.query(`ALTER TABLE "users_schedules_schedules" DROP CONSTRAINT "FK_769d9228bbd2ab82123b10c6eae"`);
            yield queryRunner.query(`ALTER TABLE "users_schedules_schedules" DROP CONSTRAINT "FK_7da359c2e66a653eef8a6f054ce"`);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD "professionalId" uuid`);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD "userId" uuid`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_dd1d7e698cd0ee5a6168d4da80"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_0c297424771463224b85e60036"`);
            yield queryRunner.query(`DROP TABLE "professional_schedules_schedules"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_769d9228bbd2ab82123b10c6ea"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7da359c2e66a653eef8a6f054c"`);
            yield queryRunner.query(`DROP TABLE "users_schedules_schedules"`);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_0cd2e6104498cfadfcebc60e1d3" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.createTable1667525872333 = createTable1667525872333;
