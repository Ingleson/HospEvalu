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
    throw new AppError(404, "Professional not found")
  }

  if (findComments.comments.length < 1) {
    throw new AppError(404, "Comments not found")
  }

  return findComments
}
