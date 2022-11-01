import { Request, Response } from "express";
import { listHospitalsService } from "../../Services/hospital/listHospitals.service";

export const listHospitalsController = async (req: Request, res: Response) => {
  const hospitals = await listHospitalsService();

  return res.json(hospitals);
};