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
exports.Professional = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const hospital_entity_1 = require("./hospital.entity");
const schedules_entity_1 = require("./schedules.entity");
const serviceType_entity_1 = require("./serviceType.entity");
let Professional = class Professional {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Professional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Professional.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Professional.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Professional.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Professional.prototype, "crm", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Professional.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Professional.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Professional.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => comment_entity_1.Comment, (comment) => comment.professional),
    __metadata("design:type", Array)
], Professional.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => schedules_entity_1.Schedule, (schedule) => schedule.professional, {
        eager: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Professional.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => hospital_entity_1.Hospital, (hospital) => hospital.professional, {
        eager: true,
    }),
    __metadata("design:type", hospital_entity_1.Hospital)
], Professional.prototype, "hospital", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => serviceType_entity_1.ServiceType, (servicetype) => servicetype.professional, {
        eager: true,
    }),
    __metadata("design:type", serviceType_entity_1.ServiceType)
], Professional.prototype, "serviceType", void 0);
Professional = __decorate([
    (0, typeorm_1.Entity)("professional")
], Professional);
exports.Professional = Professional;
