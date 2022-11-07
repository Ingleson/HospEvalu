import { IUserRequest, IUserResponse } from "../../Interfaces/users"
import { AppDataSource } from "../../data-source"
import { hash } from "bcrypt"
import { User } from "../../Entities/user.entity"
import { Address } from "../../Entities/address.entity"
import { AppError } from "../../Error/appError"
import getAddress from "../../Utils/viaCep"

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
  address,
}: IUserRequest): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User)
  const addressRepository = AppDataSource.getRepository(Address)

  if (!password) {
    throw new AppError(400, "Senha requerida")
  }

  if (!name || !email || isAdm === undefined || !address) {
    throw new AppError(400, "Está faltando dados")
  }

  const findUser = await userRepository.findOneBy({
    email,
  })

  if (findUser) {
    throw new AppError(400, "Usuário já existente")
  }

  const findAddress = await addressRepository.findOneBy({
    zipCode: address?.zipCode,
    number: address?.number,
  })

  const addressData = await getAddress(address.zipCode!)

  const newAddress = findAddress
    ? findAddress
    : await addressRepository.save({
        zipCode: addressData.cep,
        city: addressData.localidade,
        state: addressData.uf,
        hood: addressData.bairro,
        number: address.number,
        complement: address.complement || addressData.complemento,
      })

  const hashedPassword = await hash(password, 10)

  const user = await userRepository.save({
    name,
    email,
    password: hashedPassword,
    isAdm,
    address: newAddress,
  })

  const newUser = await userRepository.findOneBy({ email })

  return newUser!
}

export default createUserService
