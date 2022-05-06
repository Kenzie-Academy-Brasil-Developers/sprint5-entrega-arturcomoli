import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import listSingleUserService from "../services/user/listSingleUser.service";
import listUsersService from "../services/user/listUsers.service";
import updateUserService from "../services/user/updateUser.service";
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
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await listSingleUserService({ id });
    return res.status(200).json(user);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, age, password } = req.updateUser;

    const updatedUser = await updateUserService(
      { id },
      { name, email, age, password }
    );
    // delete updatedUser!.password;

    return res.status(200).json(updatedUser);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteUserService({ id });

    return res.status(204).json();
  }
}
