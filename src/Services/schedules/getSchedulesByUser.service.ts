import { AppDataSource } from "../../data-source";
import { Schedule } from "../../Entities/schedules.entity";
import { User } from "../../Entities/user.entity";
import { AppError } from "../../Error/appError";
import { ISchedule } from "../../Interfaces/schedules";

const getSchedulesByUserService = async (userId: string): Promise<ISchedule[]> => {
    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({
        id: userId
    })

    if(!user){
        throw new AppError(404, "Usuário não encontrado")
    }

    return user.schedules
}

export default getSchedulesByUserService