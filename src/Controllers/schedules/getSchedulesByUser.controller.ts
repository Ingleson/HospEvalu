import { Request, Response } from "express";
import { AppError, handleError } from "../../Error/appError";
import getSchedulesByUserService from "../../Services/schedules/getSchedulesByUser.service";

const getSchedulesByUserController = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const userSchedules = await getSchedulesByUserService(userId)

        return res.status(200).send(userSchedules)
    } catch (error) {
        if(error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export default getSchedulesByUserController