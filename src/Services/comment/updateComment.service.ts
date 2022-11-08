import { AppDataSource } from "../../data-source"
import { Comment } from "../../Entities/comment.entity"
import { AppError } from "../../Error/appError"
import { ICommentUpdate } from "../../Interfaces/comment"

const updateCommentService = async ({ commentId, content }: ICommentUpdate) => {
  const commentRepository = AppDataSource.getRepository(Comment)

  const comment: Comment | null = await commentRepository.findOneBy({
    id: commentId,
  })

  if (!comment) {
    throw new AppError(404, "Comment not found")
  }

  await commentRepository.update(commentId, { content: content })

  const commentUp = await commentRepository.findOneBy({ id: commentId })

  return commentUp
}

export default updateCommentService
