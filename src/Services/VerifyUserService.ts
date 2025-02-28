import prisma from "../../prisma/PrismaClient";
import { NowTime } from "../Utils/NowTime";

export const VerifyUserService = async (token: string, email: string): Promise<string> => {
    
    try {
        
        if (!token || !email) throw new Error("Requested data can not be empty.");

        const findUser = await prisma.user.findUnique({ where: { email: email }});
        if(!findUser) throw new Error("User not found.");

        if(findUser.verify_code !== token) throw new Error("Validation failed.");

        await prisma.user.update({ where: { email: email }, data: { verifyed: true, verified_at: NowTime.justNow() } });

        return "User verifyed successfully.";
    } catch (err: any) {
        throw new Error(err.message);
    }
}