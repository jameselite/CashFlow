import { LoginUserService } from "../../Services/Auth/LoginUserService";
import type { Request, Response } from "express";

export const LoginController = async (req:Request, res:Response) => {
    try {
        
        const { email, password } = req.body;
        if(!email || !password) res.status(400).json({ error: "Requested data can not be empty.", success: false });

        const LoginService: any = await LoginUserService(email, password);

        let accessExpire: Date = new Date();
        accessExpire.setMinutes(accessExpire.getMinutes() + 15);

        let refreshExpire: Date = new Date();
        refreshExpire.setDate(refreshExpire.getDate() + 90);

        res.cookie('accessToken', LoginService.accessToken, { expires: accessExpire, httpOnly: true, sameSite: true, secure: true });
        res.cookie('refreshToken', LoginService.refreshToken, { expires: refreshExpire, httpOnly: true, sameSite: true, secure: true })

        res.status(200).json({ message: LoginService.message, success: true });
    } catch (err: any) {
        res.status(400).json({ error: err.message, success: false });
    }
}