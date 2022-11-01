import "reflect-metadata"
import "express-async-errors"

import express from "express"
import errorMiddleware from "./Middlewares/error/error.middleware"
import appRoutes from "./Routes"

const app = express()
app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

export default app
