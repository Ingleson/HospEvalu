import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import process from "process"

const sessionProfessionalService = async (email: string, password: string) => {
  const professionalRepository = AppDataSource.getRepository(Professional)

  const getProfessional = await professionalRepository.findOneBy({ email })

  if (!getProfessional) {
    throw new AppError(404, "email ou senha inválidos")
  }

  const verifyPassword = bcrypt.compareSync(password, getProfessional.password)

  if (!verifyPassword) {
    throw new AppError(401, "email ou senha inválidos")
  }

  const token = jwt.sign(
    { crm: getProfessional.crm },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1d",
    }
  )

  return token
}

export default sessionProfessionalService
