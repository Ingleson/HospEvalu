import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"
import { ISchedule } from "../../Interfaces/schedules"

const getSchedulesByProfessionalService = async (professionalId: string) => {
  const professionalRepository = AppDataSource.getRepository(Professional)
  const professional = await professionalRepository.findOne({
    where: {
      id: professionalId,
    },
    relations: {
      schedules: { user: true },
    },
  })

  if (!professional) {
    throw new AppError(404, "Profissional não encontrado")
  }

  const schedulesReturn = professional.schedules.map((schedule, index) => {
    return {
      id: professional.schedules[index].id,
      description: professional.schedules[index].description,
      day: professional.schedules[index].day,
      hour: professional.schedules[index].hour,
      user: {
        id: professional.schedules[index].user.id,
        name: professional.schedules[index].user.name,
      },
      professional: {
        id: professional.id,
        name: professional.name,
      },
    }
  })

  return schedulesReturn
}

export default getSchedulesByProfessionalService
