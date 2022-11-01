import { NextFunction, Request, Response } from "express"
import { AppError, handleError } from "../Error/appError"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../data-source"

const authUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRepository = AppDataSource.getRepository("User") //Importar quando as entity ficar pronta
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      throw new AppError(403, "Token é obrigatório")
    }

    const getUserId = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError(403, "Token inválido")
        }
        return decoded.id
      }
    )

    const userAcc = await userRepository.findOneBy({ id: getUserId })

    if (!userAcc) {
      throw new AppError(404, "Usuário não encontrado")
    }

    req.user = {
      id: userAcc.id,
      email: userAcc.email,
      isAdm: userAcc.isAdm,
      name: userAcc.name,
    }

    next()
  } catch (err) {
    if (err instanceof AppError) {
      return handleError(err, res)
    }
  }
}

export default authUserMiddleware
