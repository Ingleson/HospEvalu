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
exports.allCommentsByProfessionalService = void 0;
const data_source_1 = require("../../data-source");
const professional_entity_1 = require("../../Entities/professional.entity");
const appError_1 = require("../../Error/appError");
const allCommentsByProfessionalService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const findComments = yield professionalRepository.findOne({
        where: {
            id,
        },
        relations: {
            comments: true,
        },
    });
    if (!findComments) {
        throw new appError_1.AppError(404, "Professional not found");
    }
    if (findComments.comments.length < 1) {
        throw new appError_1.AppError(404, "Comments not found");
    }
    return findComments;
});
exports.allCommentsByProfessionalService = allCommentsByProfessionalService;
