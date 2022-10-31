import { Request, Response } from "express"
import { AppError, handleError } from "../Error/appError"
import templateService from "../Services/template.service"

const templateController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const emailList = await templateService(email)

    return res.status(201).json(emailList)
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default templateController
