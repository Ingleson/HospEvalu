import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"

const activateProfessionalService = async (
  id: string,
  user: any,
  is_active: boolean
) => {
  if (!user.is_adm) {
    throw new AppError(401, "Apenas usuários administradores")
  }

  const professionalRepository = AppDataSource.getRepository("Professional") //Importar quando as entity ficar pronta

  const professionalToBeActivated = await professionalRepository.findOneBy({
    id,
  })

  if (!professionalToBeActivated) {
    throw new AppError(404, "Profissional não encontrado")
  }

  await professionalRepository.update(id, {
    is_active,
  })

  return {
    message: `O profissional com CRM: ${professionalToBeActivated.CRM} foi ativado`,
  }
}

export default activateProfessionalService
