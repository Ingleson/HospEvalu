import { Express } from "express"
import { commentRoutes } from "./comments.routes"
import { hospitalRoutes } from "./hospital.routes"
import professionalRoutes from "./professional.route"
import sessionRoutes from "./session.route"
import userRoutes from "./users.route"

const appRoutes = (app: Express) => {
  app.use("/professional", professionalRoutes)
  app.use("/login", sessionRoutes)
  app.use("/hospital", hospitalRoutes)
  app.use("/user", userRoutes)
  app.use("/comment", commentRoutes)
}

export default appRoutes
