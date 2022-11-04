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
const appError_1 = require("../../Error/appError");
const address_entity_1 = require("../../Entities/address.entity");
const updateUserService = (name, email, password, address, id, loggedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const addressRepository = data_source_1.AppDataSource.getRepository(address_entity_1.Address);
    const findUser = yield userRepository.findOneBy({
        id,
    });
    if (!findUser) {
        throw new appError_1.AppError(404, "Usuário não encontrado");
    }
    if (email) {
        const existEmail = yield userRepository.findOneBy({
            email,
        });
        if (existEmail) {
            throw new appError_1.AppError(404, "Email já existente");
        }
    }
    const findAddress = yield addressRepository.findOneBy({
        id: findUser.address.id,
    });
    if (loggedUser.isAdm === false && id !== loggedUser.id) {
        throw new appError_1.AppError(401, "Sem permissão");
    }
    const idAddress = findAddress === null || findAddress === void 0 ? void 0 : findAddress.id;
    if (password && (0, bcrypt_1.compareSync)(password, findUser.password)) {
        throw new appError_1.AppError(409, "Utilize uma senha diferente");
    }
    const hashedPassword = password && (yield (0, bcrypt_1.hash)(password, 10));
    yield addressRepository.update(idAddress, {
        state: (address === null || address === void 0 ? void 0 : address.state) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.state),
        city: (address === null || address === void 0 ? void 0 : address.city) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.city),
        hood: (address === null || address === void 0 ? void 0 : address.hood) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.hood),
        complement: (address === null || address === void 0 ? void 0 : address.complement) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.complement),
        zipCode: (address === null || address === void 0 ? void 0 : address.zipCode) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.zipCode),
        number: (address === null || address === void 0 ? void 0 : address.number) || (findAddress === null || findAddress === void 0 ? void 0 : findAddress.number),
    });
    yield userRepository.update(id, {
        name: name || findUser.name,
        email: email || findUser.email,
        password: hashedPassword || findUser.password,
    });
    const user = yield userRepository.findOneBy({
        id,
    });
    return user;
});
exports.default = updateUserService;
