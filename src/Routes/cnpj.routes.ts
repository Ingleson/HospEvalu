import { Router } from "express"
import { activateCnpjController } from "../Controllers/cnpj/activateCnpj.controller"
import { createCnpjController } from "../Controllers/cnpj/createCnpj.controller"
import { deleteCnpjController } from "../Controllers/cnpj/deleteCnpj.controller"
import { listCnpjsController } from "../Controllers/cnpj/listCnpj.controller"
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware"
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware"

export const cnpjRoutes = Router()

cnpjRoutes.get("", ensureAuthMiddleware, listCnpjsController)
cnpjRoutes.patch(
  "/activate/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  activateCnpjController
)
cnpjRoutes.post("", ensureAuthMiddleware, createCnpjController)
cnpjRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteCnpjController
)
