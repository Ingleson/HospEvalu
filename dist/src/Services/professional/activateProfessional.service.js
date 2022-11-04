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
const appError_1 = require("../../Error/appError");
const activateProfessionalService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.isAdm) {
        throw new appError_1.AppError(401, "Apenas usuários administradores");
    }
    const professionalRepository = data_source_1.AppDataSource.getRepository("Professional"); //Importar quando as entity ficar pronta
    const professionalToBeActivated = yield professionalRepository.findOneBy({
        id,
    });
    if (!professionalToBeActivated) {
        throw new appError_1.AppError(404, "Profissional não encontrado");
    }
    if (professionalToBeActivated.isActive) {
        throw new appError_1.AppError(409, "Este profissional já esta ativo");
    }
    yield professionalRepository.update(id, {
        isActive: true,
    });
    return {
        message: `O profissional com CRM: ${professionalToBeActivated.crm} foi ativado`,
    };
});
exports.default = activateProfessionalService;
