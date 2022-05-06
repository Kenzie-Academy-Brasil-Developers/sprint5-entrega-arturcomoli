import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
export default class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password, age } = req.validUser;

    try {
      const user = await createUserService({ name, email, password, age });

      delete user.password;

      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.name,
          status: err.message,
        });
      }
    }
  }
  async index(req: Request, res: Response) {}
  async show(req: Request, res: Response) {}
  async update(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}
