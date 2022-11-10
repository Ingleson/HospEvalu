import { AppDataSource } from "../../data-source"
import { Comment } from "../../Entities/comment.entity"
import { AppError } from "../../Error/appError"
import { ICommentUpdate } from "../../Interfaces/comment"

const updateCommentService = async ({ userId, content }: ICommentUpdate) => {
  const commentRepository = AppDataSource.getRepository(Comment)

  const comment: Comment | null = await commentRepository.findOne({
    where: {
      id: userId,
    },
  })

  if (!comment) {
    throw new AppError(404, "Comentario não encontrado")
  }

  await commentRepository.update(userId, { content: content })

  const commentUp = await commentRepository.findOneBy({ id: userId })

  const returnComment = {
    id: commentUp?.id,
    content: commentUp?.content,
    message: "Comentario editado com sucesso!",
  }

  return returnComment
}

export default updateCommentService
