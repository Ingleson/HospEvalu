import { Request, Response } from "express";
import { IUserLogin } from "../../Interfaces/users";
import createSessionUserService from "../../Services/sessions/users/sessionsUser.service";

const createSessionController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const token = await createSessionUserService(data);
  return res.json({ token });
};

export { createSessionController };