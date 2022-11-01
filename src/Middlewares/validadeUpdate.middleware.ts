import { Request, Response, NextFunction } from "express";
import { AppError } from "../Error/appError";

const validadeUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.id !== undefined) {
    throw new AppError(401, "Unauthorized");
  }
  
  if (req.body.isAdm !== undefined) {
    throw new AppError(401, "Unauthorized");
  }

  return next();
};

export default validadeUpdateMiddleware;