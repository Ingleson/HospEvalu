import { IUserRequest, IUserResponse } from "../../Interfaces/users";
import { AppDataSource } from "../../data-source";
import { hash } from "bcrypt";
import { AppError } from "../../Error/appError";
import { User } from "../../Entities/user.entity";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
  address
}: IUserRequest): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    email,
  });

  if (findUser !== null) {
    throw new AppError(400, "Usuário já existente");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
    address
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;