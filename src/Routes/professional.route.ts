import { Router } from "express"
import activateProfessionalController from "../Controllers/Professional/activateProfessional.controller"
import createProfessionalController from "../Controllers/Professional/createProfessional.controller"
import listAllProfessionalsController from "../Controllers/Professional/listAllProfessionals.controller"
import updateProfessionalController from "../Controllers/Professional/updateProfessional.controller"
import authUserMiddleware from "../Middlewares/authUser.middleware"

const routes = Router()

export const professionalRoutes = () => {
  routes.post("/", createProfessionalController)

  routes.get("/", authUserMiddleware, listAllProfessionalsController)

  routes.patch(
    "/activate/:id",
    authUserMiddleware,
    activateProfessionalController
  )

  routes.patch("/:id", authUserMiddleware, updateProfessionalController)

  return routes
}
