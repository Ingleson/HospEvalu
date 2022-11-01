import { Express } from "express"
import {sessionUserRoutes} from "./sessionsUser.route";
import { templateRoute } from "./template.route"
import { userRoutes } from "./users.route";

const appRoutes = (app: Express) => {
  app.use("/email", templateRoute())
  app.use("/users", userRoutes);
  app.use("/login", sessionUserRoutes);
}

export default appRoutes
