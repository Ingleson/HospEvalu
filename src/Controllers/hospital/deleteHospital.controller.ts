import { Request, Response } from "express";
import { deleteHospitalService } from "../../Services/hospital/deleteHospital.service";

export const deleteHospitalController = async (req: Request, res: Response) => {
  const id: string = req.params.id

  const deletedHospital = await deleteHospitalService(id);

  return deletedHospital;
};