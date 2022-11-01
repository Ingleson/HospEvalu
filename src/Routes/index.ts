import { Express } from "express"
import { professionalRoutes } from "./professional.route"

import { templateRoute } from "./template.route"

const appRoutes = (app: Express) => {
  app.use("/email", templateRoute())
  app.use("/professional", professionalRoutes())
}

export default appRoutes
