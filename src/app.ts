import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import "express-async-errors";
import userRouter from "./routers/users.routes";
import routes from "./routers";
import appErrorsMiddleware from "./middlewares/appErrors.middleware";

const app = express();
app.use(express.json());

app.use(routes);
app.use(appErrorsMiddleware);

app.listen(process.env.PORT || 3333, () => {
  console.log(`App running on port: ${process.env.PORT || 3333}`);
});
