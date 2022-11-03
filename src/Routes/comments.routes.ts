import { Router } from "express";
import { allCommentsByProfessionalController } from "../Controllers/comment/allCommentsByProfessional.controller";
import { createCommentController } from "../Controllers/comment/createComment.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";

export const commentRoutes = Router();

commentRoutes.post('', ensureAuthMiddleware, createCommentController);
commentRoutes.get('/professional/:id', ensureAuthMiddleware, allCommentsByProfessionalController);