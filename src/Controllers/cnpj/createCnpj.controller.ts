import { Request, Response } from "express"
import { ICnpjRequest } from "../../Interfaces/cpnj"
import { createCnpjService } from "../../Services/cnpj/createCnpj.service"

export const createCnpjController = async (req: Request, res: Response) => {
  const data: ICnpjRequest = req.body
  const createdCnpj = await createCnpjService(data)

  return res.status(201).json(createdCnpj)
}
