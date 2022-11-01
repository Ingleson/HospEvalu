import { Express } from "express"
import professionalRoutes from "./professional.route"
import sessionRoutes from "./session.route"

const appRoutes = (app: Express) => {
  app.use("/professional", professionalRoutes)
  app.use("/login", sessionRoutes)
}

export default appRoutes
