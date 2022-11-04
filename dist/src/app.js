"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./Middlewares/error/error.middleware"));
const Routes_1 = __importDefault(require("./Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, Routes_1.default)(app);
app.use(error_middleware_1.default);
exports.default = app;
