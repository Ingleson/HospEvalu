import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../Error/appError";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError(401, "Invalid token");
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      throw new AppError(401, "Invalid token");
    }

    req.user = {
      isAdm: decoded.isAdm,
      id: decoded.sub,
    };

    next();
  });
};

export default ensureAuthMiddleware;