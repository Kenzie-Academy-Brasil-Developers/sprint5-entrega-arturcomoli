import { Request, Response, NextFunction } from "express";

import { CreateUser, UpdateUser } from "../interfaces/user";
import * as yup from "yup";
import { SchemaOf } from "yup";
import CustomError from "../errors/CustomError";

export const updateUserSchema: SchemaOf<UpdateUser> = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .email()
    .transform((value, originalValue) => originalValue.toLowerCase()),
  password: yup.string().trim(),
  age: yup.number().min(18),
});

export const validatedUpdateUser =
  (schema: SchemaOf<UpdateUser>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        if (!Object.values(validatedData).length) {
          return res.status(400).json({
            status: "error",
            message: "Nothing to update!",
          });
        }

        req.updateUser = validatedData;
        next();
      } catch (err: any) {
        return res.status(400).json({
          status: "error",
          message: err.errors?.join(", "),
        });
      }
    } catch (err) {
      next(err);
    }
  };
