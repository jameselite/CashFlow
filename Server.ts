import express from "express";
import type { Request, Response, Express } from "express";
import dotenv from "dotenv";
import AuthRouter from "./src/Routes/AuthRoutes.ts";
import schedule from "node-schedule";
import { DeleteNotVerifyed } from "./src/Services/DeleteNotVerifyed.ts";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ Message: "Welcome to MyDoc" });
});

app.use(express.json());
app.use("/api/auth/", AuthRouter);

let deletejob = schedule.scheduleJob('0 5 * * *', async () => {
  try {
    
    console.log("Starting the job < deleting non-verified users > ")
    await DeleteNotVerifyed();
    console.log("Job < Deleting non-verifyed users were successfull > ");

  } catch (err: any) {
    console.log("Error: ", err.message);
    deletejob.cancel();
  }
})

app.listen(process.env.PORT, (): void => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});