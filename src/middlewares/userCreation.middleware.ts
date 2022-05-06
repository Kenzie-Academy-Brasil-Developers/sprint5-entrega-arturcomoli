import { Request, Response, NextFunction } from "express";

import { CreateUser } from "../interfaces/user";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const createUserSchema: SchemaOf<CreateUser> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  age: yup.number().min(18).required(),
});

export const validateUserCreation =
  (schema: SchemaOf<CreateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.validUser = validatedData;
        next();
      } catch (err: any) {
        return res.status(400).json({
          error: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
