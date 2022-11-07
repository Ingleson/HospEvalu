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
exports.updateMigration1667504537227 = void 0;
class updateMigration1667504537227 {
    constructor() {
        this.name = 'updateMigration1667504537227';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "service_type" ("id" uuid NOT NULL, "name" character varying NOT NULL, "price" double precision NOT NULL, "duration" character varying NOT NULL, CONSTRAINT "PK_0a11a8d444eff1346826caed987" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL, "day" TIMESTAMP NOT NULL, "hour" TIME NOT NULL, "description" character varying(200) NOT NULL, "serviceTypeId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(60) NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL, "content" character varying NOT NULL, "userId" uuid, "professionalId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "professional" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "crm" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT false, "hospitalId" uuid, "serviceTypeId" uuid, CONSTRAINT "PK_2846b0dcaac01f9983cb719f124" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "hospital" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "addressId" uuid, CONSTRAINT "UQ_d447d82c2fbee792301253d2f5d" UNIQUE ("cnpj"), CONSTRAINT "REL_40829aab552323dab29856e316" UNIQUE ("addressId"), CONSTRAINT "PK_10f19e0bf17ded693ea0da07d95" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying NOT NULL, "city" character varying NOT NULL, "hood" character varying NOT NULL, "complement" character varying NOT NULL, "zipCode" character varying NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users_schedules_schedules" ("usersId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_cb2ef564112384a053c12a9e1c9" PRIMARY KEY ("usersId", "schedulesId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_7da359c2e66a653eef8a6f054c" ON "users_schedules_schedules" ("usersId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_769d9228bbd2ab82123b10c6ea" ON "users_schedules_schedules" ("schedulesId") `);
            yield queryRunner.query(`CREATE TABLE "professional_schedules_schedules" ("professionalId" uuid NOT NULL, "schedulesId" uuid NOT NULL, CONSTRAINT "PK_679a0e3ea27d4a1742c60e2467d" PRIMARY KEY ("professionalId", "schedulesId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_0c297424771463224b85e60036" ON "professional_schedules_schedules" ("professionalId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_dd1d7e698cd0ee5a6168d4da80" ON "professional_schedules_schedules" ("schedulesId") `);
            yield queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e6f3a9e465f6e7adf928c52bd0d" FOREIGN KEY ("professionalId") REFERENCES "professional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_654f2a3c4347d03fea2298bcd9a" FOREIGN KEY ("hospitalId") REFERENCES "hospital"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "professional" ADD CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4" FOREIGN KEY ("serviceTypeId") REFERENCES "service_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "hospital" ADD CONSTRAINT "FK_40829aab552323dab29856e3166" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
            yield queryRunner.query(`ALTER TABLE "hospital" DROP CONSTRAINT "FK_40829aab552323dab29856e3166"`);
            yield queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_518bc3fc8dd3687c660e7804df4"`);
            yield queryRunner.query(`ALTER TABLE "professional" DROP CONSTRAINT "FK_654f2a3c4347d03fea2298bcd9a"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e6f3a9e465f6e7adf928c52bd0d"`);
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
            yield queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_120a20917bfe5a1ee5ba05c4646"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_dd1d7e698cd0ee5a6168d4da80"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_0c297424771463224b85e60036"`);
            yield queryRunner.query(`DROP TABLE "professional_schedules_schedules"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_769d9228bbd2ab82123b10c6ea"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_7da359c2e66a653eef8a6f054c"`);
            yield queryRunner.query(`DROP TABLE "users_schedules_schedules"`);
            yield queryRunner.query(`DROP TABLE "address"`);
            yield queryRunner.query(`DROP TABLE "hospital"`);
            yield queryRunner.query(`DROP TABLE "professional"`);
            yield queryRunner.query(`DROP TABLE "comment"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "schedules"`);
            yield queryRunner.query(`DROP TABLE "service_type"`);
        });
    }
}
exports.updateMigration1667504537227 = updateMigration1667504537227;
