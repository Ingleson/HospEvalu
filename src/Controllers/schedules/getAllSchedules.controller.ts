import { Request, Response } from "express";
import { AppError, handleError } from "../../Error/appError";
import getAllSchedulesService from "../../Services/schedules/getAllSchedules.service";

const getAllSchedulesController = async (req: Request, res: Response) => {
    try {
        const schedules = await getAllSchedulesService()

        return res.status(200).send(schedules)
    } catch (error) {
        if(error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export default getAllSchedulesController