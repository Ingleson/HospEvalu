import { Request, Response } from "express";
import { allCommentsByProfessionalService } from "../../Services/comment/allCommentsByProfessional.service";

export const allCommentsByProfessionalController = async (req: Request, res: Response) => {
  const professionalId = req.params.id;

  const commentsProfessional = await allCommentsByProfessionalService(professionalId);

  return res.json(commentsProfessional);
};