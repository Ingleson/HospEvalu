import { AppDataSource } from "../../data-source"

import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"

export const allCommentsByProfessionalService = async (id: string) => {
  const professionalRepository = AppDataSource.getRepository(Professional)

  const findComments = await professionalRepository.findOne({
    where: {
      id,
    },
    relations: {
      comments: true,
    },
  })

  if (!findComments) {
    throw new AppError(404, "Profissinal não encontrado")
  }

  if (findComments.comments.length < 1) {
    throw new AppError(404, "Comentario não encontrado")
  }

  return findComments.comments
}
