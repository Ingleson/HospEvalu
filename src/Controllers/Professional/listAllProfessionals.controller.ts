import { Request, Response } from "express"
import { AppError, handleError } from "../../Error/appError"
import listAllProfessionalsService from "../../Services/Professional/listAllProfessionals.service"

const listAllProfessionalsController = async (req: Request, res: Response) => {
  try {
    const list = await listAllProfessionalsService()

    return res.json(list)
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default listAllProfessionalsController
