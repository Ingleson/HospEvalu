import { AppDataSource } from "../../data-source"
import { Schedule } from "../../Entities/schedules.entity"
import { User } from "../../Entities/user.entity"
import { AppError } from "../../Error/appError"
import { ISchedule } from "../../Interfaces/schedules"

const getSchedulesByUserService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      schedules: { professional: true },
    },
  })

  if (!user) {
    throw new AppError(404, "Usuário não encontrado")
  }

  const schedulesReturn = user.schedules.map((schedule, index) => {
    return {
      id: user.schedules[index].id,
      description: user.schedules[index].description,
      day: user.schedules[index].day,
      hour: user.schedules[index].hour,
      user: { id: user.id, name: user.name },
      professional: {
        id: user.schedules[index].professional.id,
        name: user.schedules[index].professional.name,
      },
    }
  })

  return schedulesReturn
}

export default getSchedulesByUserService
