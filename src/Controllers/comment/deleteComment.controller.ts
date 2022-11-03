import { Request, Response } from "express";
import deleteCommentService from "../../Services/comment/deleteComment.service";

const deleteCommentController = async (req: Request, res: Response) => {
    
    const id = req.params.id

    await deleteCommentService(id)

    return res.status(204).send()
}

export default deleteCommentController