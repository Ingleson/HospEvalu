import { Router } from "express"
import sessionProfessionalController from "../Controllers/sessions/sessionProfessional.controller"

const sessionRoutes = Router()

// sessionRoutes.post('/user', createSessionController)
sessionRoutes.post('/professional', sessionProfessionalController)

export default sessionRoutes
