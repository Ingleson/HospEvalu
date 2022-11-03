import { AppDataSource } from "../../data-source"
import { Professional } from "../../Entities/professional.entity"
import { AppError } from "../../Error/appError"
import { ISchedule } from "../../Interfaces/schedules"

const getSchedulesByProfessionalService = async (professionalId: string): Promise<ISchedule[]> => {
    const professionalRepository = AppDataSource.getRepository(Professional)
    const professional = await professionalRepository.findOneBy({
        id: professionalId
    })

    if(!professional){
        throw new AppError(404, "Profissional não encontrado")
    }

    return professional.schedules
}

export default getSchedulesByProfessionalService