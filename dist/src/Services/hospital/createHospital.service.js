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
exports.createHospitalService = void 0;
const data_source_1 = require("../../data-source");
const address_entity_1 = require("../../Entities/address.entity");
const hospital_entity_1 = require("../../Entities/hospital.entity");
const appError_1 = require("../../Error/appError");
const createHospitalService = ({ address, name, cnpj, }) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitalRepository = data_source_1.AppDataSource.getRepository(hospital_entity_1.Hospital);
    const addressRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
    const findAddress = yield addressRepository.findOneBy({
        zipCode: address.zipCode,
        number: address.number,
    });
    const findCnpj = yield hospitalRepository.findOneBy({ cnpj });
    // if (findAddress) {
    //   throw new AppError(400, "Address already exists")
    // }
    // Verificar lógica do endereço
    if (findCnpj) {
        throw new appError_1.AppError(400, "Cpnj already exists");
    }
    const newAddress = addressRepository.create({
        city: address.city,
        complement: address.complement,
        number: address.number,
        hood: address.hood,
        state: address.state,
        zipCode: address.zipCode,
    });
    const createdAddress = yield addressRepository.save(newAddress);
    const hospital = hospitalRepository.create({
        address: findAddress || createdAddress,
        name,
        cnpj,
    });
    yield hospitalRepository.save(hospital);
    return hospital;
});
exports.createHospitalService = createHospitalService;
