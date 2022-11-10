import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalUpdate, IServiceTestType } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Hospital } from "../../Entities/hospital.entity"

const updateProfessionalService = async (
  data: IProfessionalUpdate,
  user: any,
  id: string
) => {
  const { name, email, password, cnpj, serviceType } = data

  const hospitalRepository = AppDataSource.getRepository(Hospital)

  const getHospital = await hospitalRepository.findOneBy({
    cnpj: cnpj,
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

  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)

  const idService: ServiceType = professionalToBeUpdated.serviceType


  const getService = serviceType ? await serviceTypeRepository.save(serviceType) : professionalToBeUpdated.serviceType

  if (
    password &&
    bcrypt.compareSync(password, professionalToBeUpdated.password)
  ) {
    throw new AppError(409, "Digite uma senha diferente da atual")
  }

  const newPassword = password && bcrypt.hashSync(password, 10)

  await professionalRepository.update(id, {
    name: name ? name: professionalToBeUpdated.name,
    email: email ? email : professionalToBeUpdated.email,
    password: password ? newPassword : professionalToBeUpdated.password,
    hospital: cnpj? getHospital : professionalToBeUpdated.hospital,
    serviceType: getService!, 
  })

  const updatedProfessional = professionalRepository.findOneBy({ id })

  return updatedProfessional
}

export default updateProfessionalService
