import { Router } from "express";
import { createHospitalController } from "../Controllers/hospital/createHospital.controller";
import { deleteHospitalController } from "../Controllers/hospital/deleteHospital.controller";
import { listHospitalsController } from "../Controllers/hospital/listHospitals.controller";

export const hospitalRoutes = Router();

hospitalRoutes.get('', listHospitalsController);
hospitalRoutes.post('', createHospitalController);
hospitalRoutes.delete('/:id', deleteHospitalController);