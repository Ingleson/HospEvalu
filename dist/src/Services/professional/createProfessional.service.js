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
const createProfessionalService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, CRM, service_type_id, hospital_cnpj } = data;
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const serviceTypeRepository = data_source_1.AppDataSource.getRepository(serviceType_entity_1.ServiceType);
    const hospitalRepository = data_source_1.AppDataSource.getRepository(hospital_entity_1.Hospital);
    const emailAlreadyExists = yield professionalRepository.findOneBy({ email });
    if (emailAlreadyExists) {
        throw new appError_1.AppError(409, "Email já está sendo utilizado!");
    }
    const getService = yield serviceTypeRepository.findOneBy({
        id: service_type_id,
    });
    if (!getService) {
        throw new appError_1.AppError(404, "Tipo de serviço não encontrado");
    }
    const getHospital = yield hospitalRepository.findOneBy({
        cnpj: hospital_cnpj,
    });
    if (!getHospital) {
        throw new appError_1.AppError(404, "Hospital não encontrado");
    }
    yield professionalRepository.save({
        name,
        email,
        password: bcrypt_1.default.hashSync(password, 10),
        crm: CRM,
        serviceType: getService,
        hospital: getHospital,
    });
    const createdProfessional = yield professionalRepository.findOneBy({ email });
    return createdProfessional;
});
exports.default = createProfessionalService;
