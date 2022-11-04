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
const bcrypt_1 = require("bcrypt");
const user_entity_1 = require("../../Entities/user.entity");
const address_entity_1 = require("../../Entities/address.entity");
const appError_1 = require("../../Error/appError");
const createUserService = ({ name, email, password, isAdm, address, }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const addressRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
    if (!password) {
        throw new appError_1.AppError(400, "Senha requerida");
    }
    if (!name || !email || isAdm === undefined || !address) {
        throw new appError_1.AppError(400, "Está faltando dados");
    }
    const findAddress = yield addressRepository.findOneBy({
        zipCode: address === null || address === void 0 ? void 0 : address.zipCode,
        number: address === null || address === void 0 ? void 0 : address.number,
    });
    if (!findAddress && address) {
        yield addressRepository.save(address);
    }
    const findUser = yield userRepository.findOneBy({
        email,
    });
    if (findUser) {
        throw new appError_1.AppError(400, "Usuário já existente");
    }
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    const user = userRepository.create({
        name,
        email,
        password: hashedPassword,
        isAdm,
        address: findAddress ? findAddress : address,
    });
    yield userRepository.save(user);
    return user;
});
exports.default = createUserService;
