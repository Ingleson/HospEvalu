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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../../Error/appError");
const createSchedule_service_1 = __importDefault(require("../../Services/schedules/createSchedule.service"));
const createScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, hour, description, serviceType, userId, professionnalId } = req.body;
    try {
        const newSchedule = yield (0, createSchedule_service_1.default)({
            day,
            hour,
            description,
            serviceType,
            userId,
            professionnalId
        });
        return res.status(201).send(newSchedule);
    }
    catch (error) {
        if (error instanceof appError_1.AppError) {
            (0, appError_1.handleError)(error, res);
        }
    }
});
exports.default = createScheduleController;
