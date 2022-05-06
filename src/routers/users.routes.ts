import { Router } from "express";
import UserController from "../controllers/userControllers.controller";
import {
  createUserSchema,
  validateUserCreation,
} from "../middlewares/userCreation.middleware";

const userRouter = Router();
const userControllers = new UserController();

userRouter.post(
  "/",
  validateUserCreation(createUserSchema),
  userControllers.store
);

userRouter.get("/", userControllers.index);
userRouter.get("/:id", userControllers.show);

userRouter.patch("/:id", userControllers.update);

userRouter.delete("/:id", userControllers.delete);

export default userRouter;
