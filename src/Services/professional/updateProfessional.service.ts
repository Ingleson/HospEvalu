import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalUpdate } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Hospital } from "../../Entities/hospital.entity"

const updateProfessionalService = async (
  data: IProfessionalUpdate,
  user: any,
  id: string
) => {
  const { name, email, password, hospital_cnpj, service_type_id } = data

  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)

  const getService = await serviceTypeRepository.findOneBy({
    id: service_type_id,
  })

  if (!getService) {
    throw new AppError(404, "Tipo de serviço não encontrado")
  }

  const hospitalRepository = AppDataSource.getRepository(Hospital)

  const getHospital = await hospitalRepository.findOneBy({
    cnpj: hospital_cnpj,
  })

  if (!getHospital) {
    throw new AppError(404, "Hospital não encontrado")
  }

  const professionalRepository = AppDataSource.getRepository(Professional) //Importar quando as entity ficar pronta

  const professionalToBeUpdated = await professionalRepository.findOneBy({
    id,
  })

  if (!professionalToBeUpdated) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (professionalToBeUpdated.id !== user.id && user.isAdm === false) {
    throw new AppError(403, "Sem autorização")
  }

  if (
    password &&
    bcrypt.compareSync(password, professionalToBeUpdated.password)
  ) {
    throw new AppError(409, "Digite uma senha diferente da atual")
  }

  const newPassword = bcrypt.hashSync(password, 10)

  professionalRepository.update(professionalToBeUpdated.id, {
    name: name || professionalToBeUpdated.name,
    email: email || professionalToBeUpdated.email,
    password: newPassword || professionalToBeUpdated.password,
    hospital: getHospital || professionalToBeUpdated.hospital,
    serviceType: getService || professionalToBeUpdated.serviceType,
  })

  return { message: "usuario atualizado" }
}

export default updateProfessionalService
