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
exports.ServiceType = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const professional_entity_1 = require("./professional.entity");
const schedules_entity_1 = require("./schedules.entity");
let ServiceType = class ServiceType {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], ServiceType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("float"),
    __metadata("design:type", Number)
], ServiceType.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ServiceType.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => schedules_entity_1.Schedule, (schedule) => schedule.serviceType),
    __metadata("design:type", Array)
], ServiceType.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => professional_entity_1.Professional, (professional) => professional.serviceType),
    __metadata("design:type", Array)
], ServiceType.prototype, "professional", void 0);
ServiceType = __decorate([
    (0, typeorm_1.Entity)("service_type"),
    __metadata("design:paramtypes", [])
], ServiceType);
exports.ServiceType = ServiceType;
