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
const professional_entity_1 = require("../../Entities/professional.entity");
const schedules_entity_1 = require("../../Entities/schedules.entity");
const serviceType_entity_1 = require("../../Entities/serviceType.entity");
const user_entity_1 = require("../../Entities/user.entity");
const appError_1 = require("../../Error/appError");
const createScheduleService = ({ day, hour, description, serviceType, userId, professionnalId }) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleRepository = data_source_1.AppDataSource.getRepository(schedules_entity_1.Schedule);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const findUser = yield userRepository.findOneBy({
        id: userId
    });
    if (!findUser) {
        throw new appError_1.AppError(404, "Usuário não encontrado");
    }
    const findProfessional = yield professionalRepository.findOneBy({
        id: professionnalId
    });
    if (!findProfessional) {
        throw new appError_1.AppError(404, "Profissional não encontrado");
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
    const newServiceType = new serviceType_entity_1.ServiceType();
    newServiceType.name = serviceType.name;
    newServiceType.duration = serviceType.duration;
    newServiceType.price = serviceType.price;
    const newSchedule = new schedules_entity_1.Schedule();
    newSchedule.day = newDay;
    newSchedule.hour = hour;
    newSchedule.description = description;
    newSchedule.serviceType = newServiceType;
    newSchedule.professional = findProfessional;
    newSchedule.user = findUser;
    scheduleRepository.create(newSchedule);
    yield scheduleRepository.save(newSchedule);
    return newSchedule;
});
exports.default = createScheduleService;
