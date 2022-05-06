import { Request, Response, NextFunction } from "express";
import CustomError from "../errors/CustomError";

const appErrorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: "error",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default appErrorsMiddleware;
