import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { Schedule } from "../../Entities/schedules.entity"
import { ISchedule } from "../../Interfaces/schedules"
import { Professional } from "../../Entities/professional.entity"

const getAllSchedulesService = async () => {
  const scheduleRepository = AppDataSource.getRepository(Schedule)
  const Schedules = await scheduleRepository.find({
    relations: {
      professional: true,
      user: true,
    },
  })

  const returnSchedule = Schedules.map((schedule) => {
    return {
      ...schedule,
      professional: {
        id: schedule.professional.id,
        name: schedule.professional.name,
      },
      user: { id: schedule.user.id, name: schedule.user.name },
    }
  })

  return returnSchedule
}

export default getAllSchedulesService
