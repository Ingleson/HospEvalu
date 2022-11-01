import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import createProfessionalService from "../../Services/Professional/createProfessional.service"

const createProfessionalController = async (req: Request, res: Response) => {
  try {
    const data: IProfessionalRequest = req.body

    const newProfessional = await createProfessionalService(data)

    return res.status(201).json(newProfessional)
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default createProfessionalController
