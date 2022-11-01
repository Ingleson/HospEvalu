import { Router } from "express"
import activateProfessionalController from "../Controllers/Professional/activateProfessional.controller"
import createProfessionalController from "../Controllers/Professional/createProfessional.controller"
import deleteProfessionalController from "../Controllers/Professional/deleteProfessional.controller"
import listAllProfessionalsController from "../Controllers/Professional/listAllProfessionals.controller"
import updateProfessionalController from "../Controllers/Professional/updateProfessional.controller"
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware"

const routes = Router()

routes.post("", createProfessionalController)

routes.get("", ensureAuthMiddleware, listAllProfessionalsController)

routes.patch(
  "/activate/:id",
  ensureAuthMiddleware,
  activateProfessionalController
)

routes.patch("/:id", updateProfessionalController)

routes.delete("/:id", deleteProfessionalController)

export default routes
