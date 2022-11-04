import { AppDataSource } from "../../data-source"
import { compareSync, hash } from "bcrypt"
import { ILoggedUser, IUser, IAddressUpdate } from "../../Interfaces/users"
import { User } from "../../Entities/user.entity"
import { AppError } from "../../Error/appError"
import { Address } from "../../Entities/address.entity"

const updateUserService = async (
  name: string,
  email: string,
  password: string,
  address: IAddressUpdate,
  id: string,
  loggedUser: ILoggedUser
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User)
  const addressRepository = AppDataSource.getRepository(Address)

  const findUser = await userRepository.findOneBy({
    id,
  })

  if (!findUser) {
    throw new AppError(404, "Usuário não encontrado")
  }

  if (email) {
    const existEmail = await userRepository.findOneBy({
      email,
    })

    if (existEmail) {
      throw new AppError(404, "Email já existente")
    }
  }

  const findAddress = await addressRepository.findOneBy({
    id: findUser.address.id,
  })

  if (loggedUser.isAdm === false && id !== loggedUser.id) {
    throw new AppError(401, "Sem permissão")
  }

  const idAddress = findAddress?.id

  if (password && compareSync(password, findUser.password)) {
    throw new AppError(409, "Utilize uma senha diferente")
  }

  const hashedPassword = password && (await hash(password, 10))

  await addressRepository.update(idAddress!, {
    state: address?.state || findAddress?.state,
    city: address?.city || findAddress?.city,
    hood: address?.hood || findAddress?.hood,
    complement: address?.complement || findAddress?.complement,
    zipCode: address?.zipCode || findAddress?.zipCode,
    number: address?.number || findAddress?.number,
  })

  await userRepository.update(id, {
    name: name || findUser.name,
    email: email || findUser.email,
    password: hashedPassword || findUser.password,
  })

  const user = await userRepository.findOneBy({
    id,
  })

  return user!
}

export default updateUserService
