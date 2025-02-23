import { type Request, type Response } from "express";
import { VerifyUserService } from "../Services/VerifyUserService";

export const VerifyUserController = async (req: Request, res: Response): Promise<void> => {

    try {
        
        const { token, user } = req.query;

        const VerifyService = await VerifyUserService(String(token), String(user));

        res.status(200).json({ message: VerifyService, success: true });

    } catch (err: any) {

        res.status(400).json({ error: err.message, success: false });
    }
}