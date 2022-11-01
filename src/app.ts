import "express-async-errors"
import "reflect-metadata"
import express from "express"
import errorMiddleware from "./Middlewares/error/error.middleware"
import appRoutes from "./Routes"
import "dotenv/config"

const app = express()
app.use(express.json())

app.use(errorMiddleware)

appRoutes(app)

export default app
