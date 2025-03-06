import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export interface TheUser {
    id: string;
    email: string;
}

export const AuthCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    try {
        
        const accessToken: string = req.cookies.accessToken;

        if(!accessToken) res.status(400).json({ error: "Access token is missing.", success: false });


        jwt.verify(accessToken, process.env.JWT_ACCESS!, (err, user) => {
            if(err) throw new Error("Token is invalid.");
            req.user = user;
            next();
        })
        
    } catch (err: any) {
        res.status(500).json({ error: err.message, success: false })
    }
}