import { Request, Response } from "express"
import updateCommentService from "../../Services/comment/updateComment.service"

const updateCommentController = async (req: Request, res: Response) => {
  const { content } = req.body
  const commentId = req.params.id

  const commentUp = await updateCommentService({ commentId, content })

  return res.status(200).json(commentUp)
}

export default updateCommentController
