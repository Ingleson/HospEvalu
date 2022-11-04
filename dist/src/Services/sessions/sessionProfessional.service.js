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
const professional_entity_1 = require("../../Entities/professional.entity");
const appError_1 = require("../../Error/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const process_1 = __importDefault(require("process"));
const sessionProfessionalService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const getProfessional = yield professionalRepository.findOneBy({ email });
    if (!getProfessional) {
        throw new appError_1.AppError(404, "email ou senha inválidos");
    }
    const verifyPassword = bcrypt_1.default.compareSync(password, getProfessional.password);
    if (!verifyPassword) {
        throw new appError_1.AppError(401, "email ou senha inválidos");
    }
    const token = jsonwebtoken_1.default.sign({ crm: getProfessional.crm }, process_1.default.env.SECRET_KEY, {
        expiresIn: "1d",
    });
    return token;
});
exports.default = sessionProfessionalService;
