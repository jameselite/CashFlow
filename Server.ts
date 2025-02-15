import express from "express";
import type { Request, Response, Express } from "express";
import dotenv from "dotenv";
import AuthRouter from "./src/Routes/AuthRoutes.ts";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ Message: "Welcome to MyDoc" });
});

app.use(express.json());
app.use("/api/auth/", AuthRouter);

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
