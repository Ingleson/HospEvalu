import { Router } from "express";


const userRoutes = Router();

userRoutes.post("", );   // retorno sem senha
userRoutes.get("",);      //token e adm
userRoutes.patch("/:id",); //token e adm / não adm para o próprio user
userRoutes.delete("/:id",); //token e adm

export default userRoutes;