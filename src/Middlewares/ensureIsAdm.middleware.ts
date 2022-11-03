import { Request, Response, NextFunction } from "express";
import { AppError } from "../Error/appError";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError(401, "Apenas administrador.");
  }

  return next();
};

export default ensureIsAdmMiddleware;