/* 
This service is a GET endpoint that verify users when they click on magic link sent to their email.
*/

import prisma from "../../prisma/PrismaClient";
import { NowTime } from "../Utils/NowTime";
import { GeneratingJWT, type Tokens } from "../Utils/GeneratingJWT";

//Return type of this function is object, so we can send more stuff into controller if we want.
export const VerifyUserService = async (token: string, email: string): Promise<object> => {
    
    try {
        
        if (!token || !email) throw new Error("Requested data can not be empty.");
        // Token is UUID generated from AddUserSevice

        const findUser = await prisma.user.findUnique({ where: { email: email }});
        if(!findUser) throw new Error("User not found.");

        if(findUser.verify_code !== token) throw new Error("Validation failed.");

        await prisma.user.update({ where: { email: email }, data: { verifyed: true, verified_at: NowTime.justNow() } });
        
        const bothTokens: Tokens = await GeneratingJWT(findUser.email, findUser.id, false);

        return { message: "Verification was successfull", accessToken: bothTokens.accessToken, refreshToken: bothTokens.refreshToken };

    } catch (err: any) {
        throw new Error(err.message);
    }
}