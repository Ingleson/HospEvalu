"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const professional_entity_1 = require("./professional.entity");
const serviceType_entity_1 = require("./serviceType.entity");
const user_entity_1 = require("./user.entity");
let Schedule = class Schedule {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Schedule.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", String)
], Schedule.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 200,
    }),
    __metadata("design:type", String)
], Schedule.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], Schedule.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => professional_entity_1.Professional, (professional) => professional.id),
    __metadata("design:type", professional_entity_1.Professional)
], Schedule.prototype, "professional", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => serviceType_entity_1.ServiceType, (serviceType) => serviceType.id),
    __metadata("design:type", serviceType_entity_1.ServiceType)
], Schedule.prototype, "serviceType", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)("schedules"),
    __metadata("design:paramtypes", [])
], Schedule);
exports.Schedule = Schedule;
