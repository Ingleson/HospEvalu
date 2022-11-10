import { AppDataSource } from "../../data-source";
import { Schedule } from "../../Entities/schedules.entity";
import { AppError } from "../../Error/appError";
import { IScheduleUpdate } from "../../Interfaces/schedules";

const updateSchedulesService = async ({id, day, hour, description}: IScheduleUpdate): Promise<boolean> => {
    const scheduleRepository = AppDataSource.getRepository(Schedule)
    const schedule = await scheduleRepository.findOneBy({
        id
    })

    if(!schedule){
        throw new AppError(404, "Agendamento não encontrado")
    }


    let newDay: Date = day ? new Date(day) : schedule.day
        
    const weekDay = newDay.getDay()


    if(weekDay === 6 || weekDay === 0){
        throw new AppError(400, "Ïmpossível marcar nos fins de semana")
    }
    

    let newHour: string | number = hour ?  parseInt(hour.split(":").join('')) : schedule.hour
 
    
    if(newHour < 800 || newHour > 1800){
        throw new AppError(400, "Impossível marcar fora do horário de funcionamento")
    }


    await scheduleRepository.update(schedule.id, {
        day: newDay,
        hour: hour || schedule.hour,
        description: description || schedule.description,
    })


    return true
}

export default updateSchedulesService