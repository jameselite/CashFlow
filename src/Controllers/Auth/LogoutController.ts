import type { Request, Response } from "express";

export const LogoutController = (req: Request, res: Response) => {

    try {
        
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).json({ message: "User loged out successfully.", success: true });
    } catch (err: any) {
        res.status(400).json({ error: err.message, success: false });
    }
    
}