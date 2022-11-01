import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import updateProfessionalService from "../../Services/Professional/updateProfessional.service"

const updateProfessionalController = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const user = req.user

    const updatedProfessional = await updateProfessionalService(data, user)

    return res.json(updatedProfessional)
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default updateProfessionalController
