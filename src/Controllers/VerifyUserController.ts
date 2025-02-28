import { type Request, type Response } from "express";
import { VerifyUserService } from "../Services/VerifyUserService";
import type { Tokens } from "../Utils/GeneratingJWT";

export const VerifyUserController = async (req: Request, res: Response): Promise<void> => {

    try {
        
        const { token, user } = req.query;

        const VerifyService: any = await VerifyUserService(String(token), String(user));

        let accessExpire: Date = new Date();
        accessExpire.setMinutes(accessExpire.getMinutes() + 15);

        let refreshExpire: Date = new Date();
        refreshExpire.setDate(refreshExpire.getDate() + 90);

        res.cookie('accessToken', VerifyService.accessToken, { expires: accessExpire, httpOnly: true, sameSite: true, secure: true });
        res.cookie('refreshToken', VerifyService.refreshToken, { expires: refreshExpire, httpOnly: true, sameSite: true, secure: true })

        res.status(200).json({ message: VerifyService.message, success: true });

    } catch (err: any) {

        res.status(400).json({ error: err.message, success: false });
    }
}