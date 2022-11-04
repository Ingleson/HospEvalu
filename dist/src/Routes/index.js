"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comments_routes_1 = require("./comments.routes");
const hospital_routes_1 = require("./hospital.routes");
const professional_routes_1 = __importDefault(require("./professional.routes"));
const schedules_routes_1 = require("./schedules.routes");
const session_routes_1 = __importDefault(require("./session.routes"));
const users_routes_1 = __importDefault(require("./users.routes"));
const appRoutes = (app) => {
    app.use("/login", session_routes_1.default);
    app.use("/user", users_routes_1.default);
    app.use("/professional", professional_routes_1.default);
    app.use("/hospital", hospital_routes_1.hospitalRoutes);
    app.use("/schedules", schedules_routes_1.scheduleRoutes);
    app.use("/comment", comments_routes_1.commentRoutes);
};
exports.default = appRoutes;
