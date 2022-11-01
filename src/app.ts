import express from "express"
import errorMiddleware from "./Middlewares/error/error.middleware"
import appRoutes from "./Routes"
import userRoutes from "./Routes/users.route"

const app = express()
app.use(express.json())

app.use("/users", userRoutes);

app.use(errorMiddleware)

appRoutes(app)

export default app
