import { Request, Response } from "express"
import { activateCnpjService } from "../../Services/cnpj/activateCnpj.service"

export const activateCnpjController = async (req: Request, res: Response) => {
  const cnpjId  = req.params.id

  const activatedCnpj = await activateCnpjService(cnpjId)

  return res.status(202).json(activatedCnpj)
}
