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
exports.Hospital = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const address_entity_1 = require("./address.entity");
const professional_entity_1 = require("./professional.entity");
let Hospital = class Hospital {
    constructor() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)("uuid"),
    __metadata("design:type", String)
], Hospital.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Hospital.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Hospital.prototype, "cnpj", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => address_entity_1.Address, (address) => address.hospital, {
        eager: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Address)
], Hospital.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => professional_entity_1.Professional, (professional) => professional.id),
    __metadata("design:type", Array)
], Hospital.prototype, "professional", void 0);
Hospital = __decorate([
    (0, typeorm_1.Entity)("hospital"),
    __metadata("design:paramtypes", [])
], Hospital);
exports.Hospital = Hospital;
