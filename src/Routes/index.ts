import { Express } from "express"

import { templateRoute } from "./template.route"

const appRoutes = (app: Express) => {
  app.use("/email", templateRoute())
}

export default appRoutes
