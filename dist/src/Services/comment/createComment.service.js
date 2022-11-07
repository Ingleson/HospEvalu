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
exports.createCommentService = void 0;
const data_source_1 = require("../../data-source");
const comment_entity_1 = require("../../Entities/comment.entity");
const professional_entity_1 = require("../../Entities/professional.entity");
const user_entity_1 = require("../../Entities/user.entity");
const appError_1 = require("../../Error/appError");
const createCommentService = (userId, { professionalId, content }) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.AppDataSource.getRepository(comment_entity_1.Comment);
    const userRepository = data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const professionalRepository = data_source_1.AppDataSource.getRepository(professional_entity_1.Professional);
    const findUser = yield userRepository.findOneBy({ id: userId });
    const findProfessional = yield professionalRepository.findOneBy({
        id: professionalId,
    });
    if (!findUser) {
        throw new appError_1.AppError(404, "user not found");
    }
    if (!findProfessional) {
        throw new appError_1.AppError(404, "professional not found");
    }
    if (content.length < 1) {
        throw new appError_1.AppError(404, "To do a comment");
    }
    const newComment = commentRepository.create({
        user: { id: userId },
        professional: { id: professionalId },
        content,
    });
    yield commentRepository.save(newComment);
    return newComment;
});
exports.createCommentService = createCommentService;
