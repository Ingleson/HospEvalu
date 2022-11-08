import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Hospital } from "../../Entities/hospital.entity"

const createProfessionalService = async (data: IProfessionalRequest) => {
  const { name, email, password, CRM, serviceType, hospital_cnpj } = data

  const professionalRepository = AppDataSource.getRepository(Professional)

  const emailAlreadyExists = await professionalRepository.findOneBy({ email })

  if (emailAlreadyExists) {
    throw new AppError(409, "Email já está sendo utilizado!")
  }

  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)

  const getService = await serviceTypeRepository.findOneBy({
    name: serviceType.name,
    duration: serviceType.duration,
    price: serviceType.price,
  })

  const newService = !getService
    ? await serviceTypeRepository.save(serviceType)
    : getService

  const hospitalRepository = AppDataSource.getRepository(Hospital)

  const getHospital = await hospitalRepository.findOneBy({
    cnpj: hospital_cnpj,
  })

  if (!getHospital) {
    throw new AppError(404, "Hospital não encontrado")
  }

  await professionalRepository.save({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
    crm: CRM,
    hospital: getHospital,
    serviceType: newService,
  })

  const createdProfessional = await professionalRepository.findOneBy({ email })

  return createdProfessional
}

export default createProfessionalService
