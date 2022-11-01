import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../Controllers/users.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../Middlewares/ensureIsAdm.middleware";
import validadeUpdateMiddleware from "../Middlewares/validadeUpdate.middleware";


const userRoutes = Router();

userRoutes.post("", createUserController);   // retorno sem senha
userRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);      //token e adm
userRoutes.patch("/:id", ensureAuthMiddleware, validadeUpdateMiddleware, updateUserController); //token e adm / não adm para o próprio user
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController); //token e adm

export {userRoutes};

