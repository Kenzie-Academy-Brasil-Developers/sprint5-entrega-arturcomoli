import * as express from "express";
import { CreateUser } from "../../src/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      validUser: CreateUser;
    }
  }
}
