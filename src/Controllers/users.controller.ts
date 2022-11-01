import { Request, Response } from "express";

import { IUserRequest, IUserUpdate } from "../Interfaces/users";
import createUserService from "../Services/users/createUser.service";
import deleteUserService from "../Services/users/deleteUser.service";
import listUsersService from "../Services/users/listUsers.service";
import updateUserService from "../Services/users/updateUser.service";


const createUserController = async (req: Request, res: Response) => {
    const user: IUserRequest = req.body;
    const createdUser = await createUserService(user);
    return res.status(201).json(createdUser);
};

const listUsersController = async (req: Request, res: Response) => {
    const users = await listUsersService();
    return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
    const { name, email, password, address }: IUserUpdate = req.body;
    const id: string = req.params.id;
    const loggedUser = req.user;
    const updatedUser = await updateUserService(
    name,
    email,
    password,
    address,
    id,
    loggedUser
);
  
    return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id;    
    await deleteUserService(id);
    return res.json({message: "User Deleted"});
};



export {createUserController, listUsersController, updateUserController, deleteUserController}
