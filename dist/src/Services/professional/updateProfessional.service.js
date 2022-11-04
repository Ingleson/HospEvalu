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
const data_source_1 = require("../../data-source");
const appError_1 = require("../../Error/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const professional_entity_1 = require("../../Entities/professional.entity");
const serviceType_entity_1 = require("../../Entities/serviceType.entity");
const hospital_entity_1 = require("../../Entities/hospital.entity");
const updateProfessionalService = (data, user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, hospital_cnpj, service_type_id } = data;
    const serviceTypeRepository = data_source_1.AppDataSource.getRepository(serviceType_entity_1.ServiceType);
    const getService = yield serviceTypeRepository.findOneBy({
        id: service_type_id,
    });
    if (!getService) {
        throw new appError_1.AppError(404, "Tipo de serviço não encontrado");
    }
    const hospitalRepository = data_source_1.AppDataSource.getRepository(hospital_entity_1.Hospital);
    const getHospital = yield hospitalRepository.findOneBy({
        cnpj: hospital_cnpj,
    });
    if (!getHospital) {
        throw new appError_1.AppError(404, "Hospital não encontrado");
    }
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional); //Importar quando as entity ficar pronta
    const professionalToBeUpdated = yield professionalRepository.findOneBy({
        id,
    });
    if (!professionalToBeUpdated) {
        throw new appError_1.AppError(404, "Profissional não encontrado");
    }
    if (professionalToBeUpdated.id !== user.id && user.isAdm === false) {
        throw new appError_1.AppError(403, "Sem autorização");
    }
    if (password &&
        bcrypt_1.default.compareSync(password, professionalToBeUpdated.password)) {
        throw new appError_1.AppError(409, "Digite uma senha diferente da atual");
    }
    const newPassword = bcrypt_1.default.hashSync(password, 10);
    professionalRepository.update(professionalToBeUpdated.id, {
        name: name || professionalToBeUpdated.name,
        email: email || professionalToBeUpdated.email,
        password: newPassword || professionalToBeUpdated.password,
        hospital: getHospital || professionalToBeUpdated.hospital,
        serviceType: getService || professionalToBeUpdated.serviceType,
    });
    return { message: "usuario atualizado" };
});
exports.default = updateProfessionalService;
