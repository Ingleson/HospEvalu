import {AppDataSource} from "../../data-source";
import { hash } from "bcrypt";
import { ILoggedUser, IUser, IAddressUpdate } from "../../Interfaces/users";
import { User } from "../../Entities/user.entity";
import { AppError } from "../../Error/appError";
import { Address } from "../../Entities/address.entity";

const updateUserService = async (
  name: string | undefined,  
  email: string | undefined,
  password: string | undefined,
  address: IAddressUpdate | undefined,
  id: string,
  loggedUser: ILoggedUser
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const existEmail = await userRepository.findOneBy({
    email,
  });

  const findUser = await userRepository.findOneBy({
    id,
  });

  const findAddress = await addressRepository.findOneBy({
    id: findUser?.address.id
  });

  if (existEmail) {
    throw new AppError(404, "Email já existente");
  }

  if (!findUser) {
    throw new AppError(404, "Email ou senha inválidos");
  }

  if (loggedUser.isAdm === false && id !== loggedUser.id) {
    throw new AppError(401, "Sem permissão");
  }

  const idAddres = findAddress?.id

  await addressRepository.update(idAddres!, {
    state: address?.state ? address.state : findAddress?.state,
    city: address?.city ? address.city : findAddress?.city,
    road: address?.road ? address.road : findAddress?.road,
    complement: address?.complement ? address.complement : findAddress?.complement,
    zipCode: address?.zipCode ? address.zipCode : findAddress?.zipCode,
    number: address?.number ? address.number : findAddress?.number,
  });

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,    
    password: password ? await hash(password, 10) : findUser.password
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default updateUserService;