import prisma from "../../prisma/PrismaClient";
import { NowTime } from "../Utils/NowTime";

export const DeleteNotVerifyed = async (): Promise<void> => {
    try {

        let pastDay: number = NowTime.justDay() - 1;
        let yesterday = `${NowTime.justYear}-${NowTime.justMonth}-${pastDay}`;

        await prisma.user.deleteMany({ where: { created_at: yesterday, verifyed: false }});

    } catch (err: any) {
        
        throw new Error(err.message);
    }
}