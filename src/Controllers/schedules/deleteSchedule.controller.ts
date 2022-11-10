import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import deleteScheduleService from "../../Services/schedules/deleteSchedule.service"

const deleteScheduleController = async (req: Request, res: Response) => {
  const { id } = req.params

  const deleted = await deleteScheduleService(id)

  if (deleted) {
    return res.status(200).send({ message: "Agendamento deletado com sucesso" })
  }
}

export default deleteScheduleController
