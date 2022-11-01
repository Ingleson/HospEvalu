import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalUpdate } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"

const updateProfessionalService = async (
  data: IProfessionalUpdate,
  user: any
) => {
  const { name, email, password, hospital_id, service_type_id } = data

  const professionalRepository = AppDataSource.getRepository("Professional") //Importar quando as entity ficar pronta

  const professionalToBeUpdated = await professionalRepository.findOneBy({
    email,
  })

  if (!professionalToBeUpdated) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (professionalToBeUpdated.id !== user.id && user.is_adm === false) {
    throw new AppError(403, "Sem autorização")
  }

  if (
    password &&
    bcrypt.compareSync(password, professionalToBeUpdated.password)
  ) {
    throw new AppError(409, "Digite uma senha diferente da atual")
  }

  const newPassword = password && bcrypt.hashSync(password, 10)

  professionalRepository.update(professionalToBeUpdated.id, {
    name: name || professionalToBeUpdated.name,
    email: email || professionalToBeUpdated.email,
    password: newPassword || professionalToBeUpdated.password,
    hospital_id: hospital_id || professionalToBeUpdated.hospital_id,
    service_type_id: service_type_id || professionalToBeUpdated.service_type_id,
  })

  //fazer o retorno do usuario atualizado
}

export default updateProfessionalService
