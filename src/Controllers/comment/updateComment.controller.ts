import { Request, Response } from "express"
import updateCommentService from "../../Services/comment/updateComment.service"

const updateCommentController = async (req: Request, res: Response) => {
  const { content } = req.body
  const userId = req.params.id

  const commentUp = await updateCommentService({ userId, content })

  return res.status(200).json(commentUp)
}

export default updateCommentController
