import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import activateProfessionalService from "../../Services/Professional/activateProfessional.service"

const activateProfessionalController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = req.user
    const is_active = req.body

    const response = await activateProfessionalService(id, user, is_active)

    return res.status(202).json(response)
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default activateProfessionalController
