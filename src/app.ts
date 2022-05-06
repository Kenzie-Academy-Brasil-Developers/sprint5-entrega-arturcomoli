import express from "express";
import "dotenv/config";
import userRouter from "./routers/users.routes";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

app.listen(process.env.PORT || 3333, () => {
  console.log(`App running on port: ${process.env.PORT || 3333}`);
});
