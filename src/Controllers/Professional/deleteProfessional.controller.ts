import { Request, Response } from "express"
import deleteProfessionalService from "../../Services/professional/deleteProfessional.service"

const deleteProfessionalController = async (req: Request, res: Response) => {
  const id = req.params.id
  const user = req.user

  const deletedProfessional = await deleteProfessionalService(id, user)

  return res.status(202).json(deletedProfessional)
}

export default deleteProfessionalController
