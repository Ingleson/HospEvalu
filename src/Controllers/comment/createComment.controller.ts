import { Request, Response } from "express";
import { ICommentRequest } from "../../Interfaces/comment";
import { createCommentService } from "../../Services/comment/createComment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const data: ICommentRequest = req.body;
  const createdComement = await createCommentService(data);

  return res.status(201).json(createdComement);
};