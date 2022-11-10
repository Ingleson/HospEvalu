import { Request, Response } from "express"
import activateProfessionalService from "../../Services/professional/activateProfessional.service"

const activateProfessionalController = async (req: Request, res: Response) => {
  const id = req.params.id
  const user = req.user

  const response = await activateProfessionalService(id, user)

  return res.status(202).json(response)
}

export default activateProfessionalController
