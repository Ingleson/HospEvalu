import { Request, Response, NextFunction } from "express";
import { AppError } from "../Error/appError";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    throw new AppError(403, "User isn't admin");
  }

  return next();
};

export default ensureIsAdmMiddleware;