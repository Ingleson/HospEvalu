import { Request, Response } from "express"
import { listCnpjsService } from "../../Services/cnpj/listCnpj.service"

export const listCnpjsController = async (req: Request, res: Response) => {
  const cnpjs = await listCnpjsService()

  return res.json(cnpjs)
}
