"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hospitalRoutes = void 0;
const express_1 = require("express");
const createHospital_controller_1 = require("../Controllers/hospital/createHospital.controller");
const deleteHospital_controller_1 = require("../Controllers/hospital/deleteHospital.controller");
const listHospitals_controller_1 = require("../Controllers/hospital/listHospitals.controller");
const ensureAuth_middleware_1 = __importDefault(require("../Middlewares/ensureAuth.middleware"));
const ensureIsAdm_middleware_1 = __importDefault(require("../Middlewares/ensureIsAdm.middleware"));
exports.hospitalRoutes = (0, express_1.Router)();
exports.hospitalRoutes.get("", ensureAuth_middleware_1.default, listHospitals_controller_1.listHospitalsController);
exports.hospitalRoutes.post("", ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, createHospital_controller_1.createHospitalController);
exports.hospitalRoutes.delete("/:id", ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, deleteHospital_controller_1.deleteHospitalController);
