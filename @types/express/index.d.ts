import * as express from "express";
import { CreateUser, UpdateUser } from "../../src/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      validUser: CreateUser;
      updateUser: UpdateUser;
    }
  }
}
