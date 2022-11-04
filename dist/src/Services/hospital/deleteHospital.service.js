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
exports.deleteHospitalService = void 0;
const data_source_1 = require("../../data-source");
const appError_1 = require("../../Error/appError");
const deleteHospitalService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const hospitalRepository = data_source_1.AppDataSource.getRepository("hospital");
    const findHospital = yield hospitalRepository.findOneBy({ id });
    if (!findHospital) {
        throw new appError_1.AppError(404, "Hospital not found");
    }
    yield hospitalRepository.delete({ id });
    return { message: "Hospital was deleted" };
});
exports.deleteHospitalService = deleteHospitalService;
