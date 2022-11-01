import {AppDataSource} from "../../data-source";
import { User } from "../../Entities/user.entity";
import { AppError } from "../../Error/appError";

const deleteUserService = async (
    id: string
  ): Promise<void> => {
    const userRepository = AppDataSource.getRepository(User);
  
    const findUser = await userRepository.findOneBy({
      id,
    });
  
    if (!findUser) {
      throw new AppError(404, "Usuário não encontrado");
    }
        
    await userRepository.delete({
      id,
    });
  
};
  
  export default deleteUserService;