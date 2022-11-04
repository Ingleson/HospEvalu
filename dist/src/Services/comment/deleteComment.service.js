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
const comment_entity_1 = require("../../Entities/comment.entity");
const appError_1 = require("../../Error/appError");
const deleteCommentService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = data_source_1.AppDataSource.getRepository(comment_entity_1.Comment);
    const comment = yield commentRepository.findOneBy({ id: id });
    if (!comment) {
        throw new appError_1.AppError(404, 'Comment not found!');
    }
    commentRepository.delete(comment);
});
exports.default = deleteCommentService;
