import { IProfessional } from "../Professional"
import { IUser } from "../users"

export interface IServiceType{
    name: string,
    price: number,
    duration: string    
}

export interface IScheduleRequest{
    day: string
    hour: string
    description: string
    serviceType: IServiceType,
    userId: string
    professionnalId: string
}

export interface ISchedule{
    day: Date
    hour: string
    description: string
    serviceType: IServiceType,
    user: IUser
}

export interface IScheduleUpdate{
    day: string
    hour: string
    description: string
    id: string
}