import { IUserRequest, IUserResponse } from "../../Interfaces/users"
import { AppDataSource } from "../../data-source"
import { hash } from "bcrypt"
import { User } from "../../Entities/user.entity"
import { Address } from "../../Entities/address.entity"
import { AppError } from "../../Error/appError"

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
  address,
}: IUserRequest): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User)
  const addressRepository = AppDataSource.getRepository(Address)

  const findAddress = await addressRepository.findOneBy({
    zipCode: address?.zipCode,
    number: address?.number,
  })

  if (!findAddress && address) {
    await addressRepository.save(address)
  }

  const findUser = await userRepository.findOneBy({
    email,
  })

  if (findUser) {
    throw new AppError(400, "Usuário já existente")
  }

  const hashedPassword = await hash(password, 10)

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
    address: findAddress ? findAddress : address,
  })

  await userRepository.save(user)

  return user
}

export default createUserService
