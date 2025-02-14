import express from "express";
import type { Request, Response, Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app : Express = express();

app.get("/", (req: Request, res: Response): void=> {
    res.status(200).json({ "CashFlow": "Welcome to CashFlow !. Your tool to keep track of your company money flow"});
})

app.listen(process.env.PORT, (): void => {
    console.log(`Server is running on localhost:${process.env.PORT}`);
})