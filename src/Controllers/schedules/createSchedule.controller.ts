import { Request, Response } from "express";
import { AppError, handleError } from "../../Error/appError";
import createScheduleService from "../../Services/schedules/createSchedule.service";

const createScheduleController = async (req: Request, res: Response) => {
    const {
        day,
        hour,
        description,
        serviceType,
        userId,
        professionnalId
    } = req.body

    try {
        const newSchedule = await createScheduleService({
            day,
            hour,
            description,
            serviceType,
            userId,
            professionnalId
        })

        return res.status(201).send(newSchedule)
    } catch (error) {
        if(error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export default createScheduleController