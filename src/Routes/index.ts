import { Express } from "express"

import { hospitalRoutes } from "./hospital.routes";
import { templateRoute } from "./template.route"

const appRoutes = (app: Express) => {
  app.use("/email", templateRoute())
  app.use('/hospital', hospitalRoutes);
}


export default appRoutes
