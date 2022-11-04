import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Hospital } from "../../Entities/hospital.entity"
import { Schedule } from "../../Entities/schedules.entity"

const createProfessionalService = async (data: IProfessionalRequest) => {
  const { name, email, password, CRM, service_type_id, hospital_cnpj } = data

  const professionalRepository = AppDataSource.getRepository(Professional)
  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)
  const hospitalRepository = AppDataSource.getRepository(Hospital)

  const emailAlreadyExists = await professionalRepository.findOneBy({ email })

  if (emailAlreadyExists) {
    throw new AppError(409, "Email já está sendo utilizado!")
  }

  const getService = await serviceTypeRepository.findOneBy({
    id: service_type_id,
  })

  if (!getService) {
    throw new AppError(404, "Tipo de serviço não encontrado")
  }

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
    serviceType: getService,
    hospital: getHospital,
  })

  const createdProfessional = await professionalRepository.findOneBy({ email })

  return createdProfessional
}

export default createProfessionalService
