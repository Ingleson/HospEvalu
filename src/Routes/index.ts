import { Express } from "express"
import { commentRoutes } from "./comments.routes"
import { cnpjRoutes } from "./cnpj.routes"
import professionalRoutes from "./professional.routes"
import { scheduleRoutes } from "./schedules.routes"
import sessionRoutes from "./session.routes"
import userRoutes from "./users.routes"

const appRoutes = (app: Express) => {
  app.use("/login", sessionRoutes)
  app.use("/user", userRoutes)
  app.use("/professional", professionalRoutes)
  app.use("/cnpj", cnpjRoutes)
  app.use("/schedules", scheduleRoutes)
  app.use("/comment", commentRoutes)
}

export default appRoutes
