import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import {
  IProfessionalUpdate,
  IServiceTestType,
} from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Cnpj } from "../../Entities/cnpj.entity"

const updateProfessionalService = async (
  data: IProfessionalUpdate,
  user: any,
  id: string
) => {
  const { name, email, password, cnpj, serviceType } = data

  const cnpjRepository = AppDataSource.getRepository(Cnpj)

  const getCnpj = await cnpjRepository.findOneBy({
    cnpj: cnpj,
  })

  if (!getCnpj) {
    throw new AppError(404, "CNPJ não encontrado")
  }

  const professionalRepository = AppDataSource.getRepository(Professional)

  const professionalToBeUpdated = await professionalRepository.findOneBy({
    id,
  })

  if (!professionalToBeUpdated) {
    throw new AppError(404, "Profissional não encontrado")
  }

  if (professionalToBeUpdated.id !== user.id && user.isAdm === false) {
    throw new AppError(403, "Sem autorização")
  }

  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)

  const getService = serviceType
    ? await serviceTypeRepository.save(serviceType)
    : professionalToBeUpdated.serviceType

  if (
    password &&
    bcrypt.compareSync(password, professionalToBeUpdated.password)
  ) {
    throw new AppError(409, "Digite uma senha diferente da atual")
  }

  const newPassword = password && bcrypt.hashSync(password, 10)

  await professionalRepository.update(id, {
    name: name ? name : professionalToBeUpdated.name,
    email: email ? email : professionalToBeUpdated.email,
    password: password ? newPassword : professionalToBeUpdated.password,
    cnpj: cnpj ? getCnpj : professionalToBeUpdated.cnpj,
    serviceType: getService!,
  })

  const updatedProfessional = professionalRepository.findOneBy({ id })

  return updatedProfessional
}

export default updateProfessionalService
