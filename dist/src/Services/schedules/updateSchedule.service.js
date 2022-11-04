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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const schedules_entity_1 = require("../../Entities/schedules.entity");
const appError_1 = require("../../Error/appError");
const updateSchedulesService = ({ id, day, hour, description }) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.AppDataSource.getRepository(schedules_entity_1.Schedule);
    const schedule = yield scheduleRepository.findOneBy({
        id
    });
    if (!schedule) {
        throw new appError_1.AppError(404, "Agendamento não encontrado");
    }
    const newDay = new Date(day);
    const weekDay = newDay.getDay();
    if (weekDay === 6 || weekDay === 0) {
        throw new appError_1.AppError(400, "Ïmpossível marcar nos fins de semana");
    }
    let newHour = parseInt(hour.split(":").join(''));
    if (newHour < 800 || newHour > 1800) {
        throw new appError_1.AppError(400, "Impossível marcar fora do horário de funcionamento");
    }
    yield scheduleRepository.update(schedule.id, {
        day: newDay || schedule.day,
        hour: hour || schedule.hour,
        description: description || schedule.description,
    });
    return true;
});
exports.default = updateSchedulesService;
