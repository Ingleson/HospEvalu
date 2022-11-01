import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"

const activateProfessionalService = async (id: string, user: any) => {
  if (!user.isAdm) {
    throw new AppError(401, "Apenas usuários administradores")
  }

  const professionalRepository = AppDataSource.getRepository("Professional") //Importar quando as entity ficar pronta

  const professionalToBeActivated = await professionalRepository.findOneBy({
    id,
  })

  if (!professionalToBeActivated) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (professionalToBeActivated.isActive) {
    throw new AppError(409, "Este profissional já esta ativo")
  }

  await professionalRepository.update(id, {
    isActive: true,
  })

  return {
    message: `O profissional com CRM: ${professionalToBeActivated.crm} foi ativado`,
  }
}

export default activateProfessionalService
