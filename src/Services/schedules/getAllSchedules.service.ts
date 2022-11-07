import { AppDataSource } from "../../data-source"
import { AppError } from "../../Error/appError"
import { Schedule } from "../../Entities/schedules.entity"
import { ISchedule } from "../../Interfaces/schedules"

const getAllSchedulesService = async (): Promise<ISchedule[]> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule)
  const Schedules = await scheduleRepository.find({
    relations: { professional: true, user: true },
  })

  return Schedules
}

export default getAllSchedulesService
