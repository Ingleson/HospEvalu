import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"

const listAllProfessionalsService = async () => {
  const professionalRepository = AppDataSource.getRepository(Professional)

  const professionalList = await professionalRepository.find()

  if (professionalList.length < 1) {
    throw new AppError(404, "Nenhum profissional cadastrado.")
  }

  return professionalList
}

export default listAllProfessionalsService
