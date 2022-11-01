import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"

const deleteProfessionalService = async (id: string, user: any) => {
  const professionalRepository = AppDataSource.getRepository(Professional)

  const professionalToBeDeleted = await professionalRepository.findOneBy({ id })

  if (!professionalToBeDeleted) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (professionalToBeDeleted.id !== user.id && user.isAdm === false) {
    throw new AppError(403, "Sem autorização")
  }

  if (!professionalToBeDeleted.isActive) {
    throw new AppError(409, "Este usuário já esta inativo")
  }

  professionalRepository.update(id, {
    isActive: false,
  })

  return {
    message: `O profissional de CRM: ${professionalToBeDeleted.crm} foi desativado`,
  }
}

export default deleteProfessionalService
