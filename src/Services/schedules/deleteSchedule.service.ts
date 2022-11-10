import { AppDataSource } from "../../data-source"
import { Schedule } from "../../Entities/schedules.entity"
import { AppError } from "../../Error/appError"

const deleteScheduleService = async (id: string): Promise<boolean> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const schedule = await scheduleRepository.findOneBy({
        id
    })

    if (!schedule){
        throw new AppError(404, "Agendamento não encontrado ou desmarcado")
    }

    await scheduleRepository.delete({id})

    return true
}

export default deleteScheduleService