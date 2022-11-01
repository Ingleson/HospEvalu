import {AppDataSource} from "../../data-source";
import { hash } from "bcrypt";
import { AppError } from "../../Error/appError";
import { ILoggedUser, IUser, IAddress } from "../../Interfaces/users";
import { User } from "../../Entities/user.entity";

const updateUserService = async (
  name: string | undefined,  
  email: string | undefined,
  password: string | undefined,
  address: IAddress | undefined,
  id: string,
  loggedUser: ILoggedUser
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError(404, "Email ou senha inválidos");
  }

  if (loggedUser.isAdm === false && id !== loggedUser.id) {
    throw new AppError(401, "Sem permissão");
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,    
    password: password ? await hash(password, 10) : findUser.password,
    address: address ? address : findUser.address,
  });

  const user = await userRepository.findOneBy({
    id,
  });

  return user!;
};

export default updateUserService;