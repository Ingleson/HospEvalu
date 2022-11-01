import { Request, Response } from "express"
import { IHospitalRequest } from "../../Interfaces/hospital"
import { createHospitalService } from "../../Services/hospital/createHospital.service"

export const createHospitalController = async (req: Request, res: Response) => {
  const data: IHospitalRequest = req.body
  const createdHospital = await createHospitalService(data)

  return res.status(201).json(createdHospital)
}
