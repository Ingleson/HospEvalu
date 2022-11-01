import { Router } from "express"
import activateProfessionalController from "../Controllers/Professional/activateProfessional.controller"
import createProfessionalController from "../Controllers/Professional/createProfessional.controller"
import deleteProfessionalController from "../Controllers/Professional/deleteProfessional.controller"
import listAllProfessionalsController from "../Controllers/Professional/listAllProfessionals.controller"
import updateProfessionalController from "../Controllers/Professional/updateProfessional.controller"
import authUserMiddleware from "../Middlewares/authUser.middleware"

const routes = Router()

routes.post("", createProfessionalController)

routes.get("", authUserMiddleware, listAllProfessionalsController)

routes.patch(
  "/activate/:id",
  authUserMiddleware,
  activateProfessionalController
)

routes.patch("/:id", updateProfessionalController)

routes.delete("/:id", deleteProfessionalController)

export default routes
