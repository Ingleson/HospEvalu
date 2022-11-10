import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { IProfessionalRequest } from "../../Interfaces/Professional"
import createProfessionalService from "../../Services/professional/createProfessional.service"

const createProfessionalController = async (req: Request, res: Response) => {
  const data: IProfessionalRequest = req.body

  const newProfessional = await createProfessionalService(data)

  return res.status(201).json(instanceToPlain(newProfessional))
}

export default createProfessionalController
