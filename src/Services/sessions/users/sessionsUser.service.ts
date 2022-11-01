import {AppDataSource} from "../../../data-source";
import { IUserLogin } from "../../../Interfaces/users";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../../Error/appError";
import "dotenv/config";
import { User } from "../../../Entities/user.entity";

const createSessionUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError(403, "Email ou senha inválidos");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403, "Email ou senha inválidos");
  }

  const token = jwt.sign(
    {
      isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};

export default createSessionUserService;