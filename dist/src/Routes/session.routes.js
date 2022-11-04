"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionProfessional_controller_1 = __importDefault(require("../Controllers/sessions/sessionProfessional.controller"));
const sessionUser_controller_1 = require("../Controllers/sessionUser.controller");
const sessionRoutes = (0, express_1.Router)();
sessionRoutes.post('/user', sessionUser_controller_1.createSessionController);
sessionRoutes.post('/professional', sessionProfessional_controller_1.default);
exports.default = sessionRoutes;
