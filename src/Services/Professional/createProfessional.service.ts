import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import bcrypt from "bcrypt"

const createProfessionalService = async (data: IProfessionalRequest) => {
  const { name, email, password, CRM, service_type_id, hospital_id } = data

  // const professionalRepository = AppDataSource.getRepository("Professional") //Importar quando as entity ficar pronta

  // const emailAlreadyExists = await professionalRepository.findOneBy({ email })

  // if (emailAlreadyExists) {
  //   throw new AppError(409, "Email já está sendo utilizado!")
  // }

  const newProfessional: IProfessionalRequest = { ...data } //new Professional() //Importar a classe quando a entity ficar pronta

  newProfessional.name = name
  newProfessional.email = email
  newProfessional.password = bcrypt.hashSync(password, 10)
  newProfessional.CRM = CRM
  newProfessional.service_type_id = service_type_id
  newProfessional.hospital_id = hospital_id

  // professionalRepository.create(newProfessional)
  // await professionalRepository.save(newProfessional)

  const professionalReturn = {
    name,
    email,
    CRM,
    service_type_id,
    hospital_id,
  }

  return professionalReturn
}

export default createProfessionalService
