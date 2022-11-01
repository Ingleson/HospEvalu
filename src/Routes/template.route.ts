import { Router } from "express"
import templateController from "../Controllers/template.controller"

const routes = Router()

routes.post("/", templateController)

export default routes
