import { AppDataSource } from "../../data-source"
import { Comment } from "../../Entities/comment.entity"
import { Professional } from "../../Entities/professional.entity"
import { User } from "../../Entities/user.entity"
import { AppError } from "../../Error/appError"
import { ICommentRequest } from "../../Interfaces/comment"

export const createCommentService = async (
  userId: string,
  { professionalId, content }: ICommentRequest
) => {
  const commentRepository = AppDataSource.getRepository(Comment)
  const userRepository = AppDataSource.getRepository(User)
  const professionalRepository = AppDataSource.getRepository(Professional)

  const findUser = await userRepository.findOneBy({ id: userId })

  const findProfessional = await professionalRepository.findOneBy({
    id: professionalId,
  })

  if (!findUser) {
    throw new AppError(404, "Usuário não encontrado")
  }

  if (!findProfessional) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (content.length < 1) {
    throw new AppError(411, "Fazer um comentario")
  }

  const newComment = commentRepository.create({
    user: { id: userId },
    professional: { id: findProfessional.id },
    content,
  })

  await commentRepository.save(newComment)

  return newComment
}
