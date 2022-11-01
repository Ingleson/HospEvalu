import { Router } from "express"
import { createHospitalController } from "../Controllers/hospital/createHospital.controller"
import { deleteHospitalController } from "../Controllers/hospital/deleteHospital.controller"
import { listHospitalsController } from "../Controllers/hospital/listHospitals.controller"
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware"
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware"

export const hospitalRoutes = Router()

hospitalRoutes.get("", ensureAuthMiddleware, listHospitalsController)
hospitalRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createHospitalController
)
hospitalRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteHospitalController
)
