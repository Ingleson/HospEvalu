import { AppDataSource } from "../../data-source"
import { Schedule } from "../../Entities/schedules.entity"

const deleteScheduleService = async (id: string): Promise<boolean> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const schedule = await scheduleRepository.findOneBy({
        id
    })

    await scheduleRepository.delete({id})

    return true
}

export default deleteScheduleService