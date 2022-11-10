import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import updateSchedulesService from "../../Services/schedules/updateSchedule.service"

const updateScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { day, hour, description } = req.body

  const update = await updateSchedulesService({ id, day, hour, description })

  if (update) {
    return res
      .status(200)
      .json({ message: "Agendamento atualizado com sucesso!" })
  }
}

export default updateScheduleController
