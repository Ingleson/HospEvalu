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
exports.deleteHospitalController = void 0;
const deleteHospital_service_1 = require("../../Services/hospital/deleteHospital.service");
const deleteHospitalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deletedHospital = yield (0, deleteHospital_service_1.deleteHospitalService)(id);
    return res.status(202).json(deletedHospital);
});
exports.deleteHospitalController = deleteHospitalController;
