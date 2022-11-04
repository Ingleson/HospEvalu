import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import getSchedulesByProfessionalService from "../../Services/schedules/getSchedulesByProfessional.service"

const getSchedulesByProfessionalController = async (req: Request, res: Response) => {
    const { professionalId } = req.params

    try {
        const professionalSchedules = await getSchedulesByProfessionalService(professionalId)

        return res.status(200).send(professionalSchedules)
    } catch (error) {
        if(error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export default getSchedulesByProfessionalController