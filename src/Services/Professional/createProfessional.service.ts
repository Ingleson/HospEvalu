import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"
import { Professional } from "../../Entities/professional.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { Hospital } from "../../Entities/hospital.entity"

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

  const newProfessional = new Professional()

  newProfessional.name = name
  newProfessional.email = email
  newProfessional.password = bcrypt.hashSync(password, 10)
  newProfessional.crm = CRM
  newProfessional.serviceType = getService
  newProfessional.hospital = getHospital || undefined

  professionalRepository.create(newProfessional)
  await professionalRepository.save(newProfessional)

  const createdProfessional = await professionalRepository.findOneBy({ email })

  return createdProfessional
}

export default createProfessionalService
