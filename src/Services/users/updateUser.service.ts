import { AppDataSource } from "../../data-source"
import { compareSync, hash } from "bcrypt"
import { ILoggedUser, IUser, IAddressUpdate } from "../../Interfaces/users"
import { User } from "../../Entities/user.entity"
import { AppError } from "../../Error/appError"
import { Address } from "../../Entities/address.entity"
import getAddress from "../../Utils/viaCep"

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

  if (loggedUser.isAdm === false && id !== loggedUser.id) {
    throw new AppError(401, "Sem permissão")
  }

  if (password && compareSync(password, findUser.password)) {
    throw new AppError(409, "Utilize uma senha diferente")
  }

  const hashedPassword = password && (await hash(password, 10))

  const findAddress = await addressRepository.findOneBy({
    id: findUser.address.id,
  })

  const idAddress = findAddress?.id

  const newAddress = address && (await getAddress(address.zipCode!))

  await addressRepository.update(idAddress!, {
    state: address ? newAddress.uf : findAddress?.state,
    city: address ? newAddress.localidade : findAddress?.city,
    hood: address ? newAddress.bairro : findAddress?.hood,
    complement: address ? newAddress.complemento : findAddress?.complement,
    zipCode: address ? newAddress.cep : findAddress?.zipCode,
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
