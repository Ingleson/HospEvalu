import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import getSchedulesByUserService from "../../Services/schedules/getSchedulesByUser.service"

const getSchedulesByUserController = async (req: Request, res: Response) => {
  const { userId } = req.params

  const userSchedules = await getSchedulesByUserService(userId)

  return res.status(200).send(userSchedules)
}

export default getSchedulesByUserController
