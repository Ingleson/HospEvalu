import { Request, Response } from "express"
import { deleteCnpjService } from "../../Services/cnpj/deleteCnpj.service"

export const deleteCnpjController = async (req: Request, res: Response) => {
  const id: string = req.params.id

  const deletedHospital = await deleteCnpjService(id)

  return res.status(204).json(deletedHospital)
}
