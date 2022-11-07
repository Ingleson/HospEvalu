import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { Schedule } from "../../Entities/schedules.entity"
import { ServiceType } from "../../Entities/serviceType.entity"
import { User } from "../../Entities/user.entity"
import { AppError } from "../../Error/appError"
import { ISchedule, IScheduleRequest } from "../../Interfaces/schedules"

const createScheduleService = async ({
  day,
  hour,
  description,
  serviceType,
  userId,
  professionnalId,
}: IScheduleRequest): Promise<ISchedule> => {
  const scheduleRepository = AppDataSource.getRepository(Schedule)
  const userRepository = AppDataSource.getRepository(User)
  const professionalRepository = AppDataSource.getRepository(Professional)
  const serviceTypeRepository = AppDataSource.getRepository(ServiceType)

  const findUser = await userRepository.findOneBy({
    id: userId,
  })

  if (!findUser) {
    throw new AppError(404, "Usuário não encontrado")
  }

  const findProfessional = await professionalRepository.findOneBy({
    id: professionnalId,
  })

  if (!findProfessional) {
    throw new AppError(404, "Profissional não encontrado")
  }

  const newDay = new Date(day)
  const weekDay = newDay.getDay()

  if (weekDay === 6 || weekDay === 0) {
    throw new AppError(400, "Ïmpossível marcar nos fins de semana")
  }

  let newHour = parseInt(hour.split(":").join(""))

  if (newHour < 800 || newHour > 1800) {
    throw new AppError(
      400,
      "Impossível marcar fora do horário de funcionamento"
    )
  }

  const newServiceType = new ServiceType()
  newServiceType.name = serviceType.name
  newServiceType.duration = serviceType.duration
  newServiceType.price = serviceType.price

  serviceTypeRepository.create(newServiceType)
  await serviceTypeRepository.save(newServiceType)

  const teste = await scheduleRepository.save({
    day: newDay,
    hour: hour,
    description: description,
    serviceType: newServiceType,
    professional: findProfessional,
    user: findUser,
  })

  // const createdSchedule = await scheduleRepository.findOneBy({
  //   id: newSchedule.id,
  // })

  return teste
}

export default createScheduleService
