import { Router } from "express";
import { createSessionController } from "../Controllers/sessionUser.controller";

const sessionUserRoutes = Router();

sessionUserRoutes.post("/users", createSessionController);

export default sessionUserRoutes;