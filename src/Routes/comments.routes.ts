import { Router } from "express";
import { allCommentsByProfessionalController } from "../Controllers/comment/allCommentsByProfessional.controller";
import { createCommentController } from "../Controllers/comment/createComment.controller";
import deleteCommentController from "../Controllers/comment/deleteComment.controller";
import updateCommentController from "../Controllers/comment/updateComment.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";

export const commentRoutes = Router();

commentRoutes.post('', ensureAuthMiddleware, createCommentController);
commentRoutes.get('/professional/:id', ensureAuthMiddleware, allCommentsByProfessionalController);
commentRoutes.delete('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, deleteCommentController)
commentRoutes.patch('/:id', ensureAuthMiddleware, ensureIsAdmMiddleware, updateCommentController)