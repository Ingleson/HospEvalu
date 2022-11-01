import { Request, Response, NextFunction } from "express";
import { AppError } from "../Error/appError";

const validadeUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (req.body.isAdm !== undefined) {
    throw new AppError(401, "Não é possível alterar status de ADM");
  }

  return next();
};

export default validadeUpdateMiddleware;