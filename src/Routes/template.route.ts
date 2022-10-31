import { Router } from "express"
import templateController from "../Controllers/template.controller"

const routes = Router()

export const templateRoute = () => {
  routes.post("/", templateController)

  return routes
}
