"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRoutes = void 0;
const express_1 = require("express");
const allCommentsByProfessional_controller_1 = require("../Controllers/comment/allCommentsByProfessional.controller");
const createComment_controller_1 = require("../Controllers/comment/createComment.controller");
const deleteComment_controller_1 = __importDefault(require("../Controllers/comment/deleteComment.controller"));
const updateComment_controller_1 = __importDefault(require("../Controllers/comment/updateComment.controller"));
const ensureAuth_middleware_1 = __importDefault(require("../Middlewares/ensureAuth.middleware"));
const ensureIsAdm_middleware_1 = __importDefault(require("../Middlewares/ensureIsAdm.middleware"));
exports.commentRoutes = (0, express_1.Router)();
exports.commentRoutes.post('', ensureAuth_middleware_1.default, createComment_controller_1.createCommentController);
exports.commentRoutes.get('/professional/:id', ensureAuth_middleware_1.default, allCommentsByProfessional_controller_1.allCommentsByProfessionalController);
exports.commentRoutes.delete('/:id', ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, deleteComment_controller_1.default);
exports.commentRoutes.patch('/:id', ensureAuth_middleware_1.default, ensureIsAdm_middleware_1.default, updateComment_controller_1.default);
