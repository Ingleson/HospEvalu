import { Router } from "express";
import { createCommentController } from "../Controllers/comment/createComment.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";

export const commentRoutes = Router();

commentRoutes.post('', ensureAuthMiddleware, createCommentController);