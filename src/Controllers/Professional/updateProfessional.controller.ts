import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import updateProfessionalService from "../../Services/professional/updateProfessional.service"

const updateProfessionalController = async (req: Request, res: Response) => {
  const data = req.body
  const user = req.user
  const id = req.params.id

  const updatedProfessional = await updateProfessionalService(data, user, id)

  return res.json(updatedProfessional)
}

export default updateProfessionalController
