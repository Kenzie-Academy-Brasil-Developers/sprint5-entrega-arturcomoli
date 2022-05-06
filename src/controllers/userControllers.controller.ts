import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
import listUsersService from "../services/user/listUsers.service";
export default class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password, age } = req.validUser;

    const user = await createUserService({ name, email, password, age });

    delete user.password;

    return res.status(201).json(user);
  }
  async index(req: Request, res: Response) {
    const users = await listUsersService();
    return res.status(200).json(users);
  }
  async show(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}
