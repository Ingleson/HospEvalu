"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../Controllers/users.controller");
const ensureAuth_middleware_1 = __importDefault(require("../Middlewares/ensureAuth.middleware"));
const ensureIsAdm_middleware_1 = __importDefault(require("../Middlewares/ensureIsAdm.middleware"));
const validadeUpdate_middleware_1 = __importDefault(require("../Middlewares/validadeUpdate.middleware"));
const userRoutes = (0, express_1.Router)();
userRoutes.post("", users_controller_1.createUserController); // retorno sem senha
userRoutes.get("", ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, users_controller_1.listUsersController); //token e adm
userRoutes.patch("/:id", ensureAuth_middleware_1.default, validadeUpdate_middleware_1.default, users_controller_1.updateUserController); //token e adm / não adm para o próprio user
userRoutes.delete("/:id", ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, users_controller_1.deleteUserController); //token e adm
exports.default = userRoutes;
