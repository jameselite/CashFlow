import prisma from "../../../prisma/PrismaClient";
import bcrypt from "bcryptjs";
import { GeneratingJWT, type Tokens } from "../../Utils/GeneratingJWT";

export const LoginUserService = async (email: string, password: string): Promise<object> => {
    try {
        
        const findUser = await prisma.user.findUnique({ where: { email: email } });
        if(!findUser) throw new Error("user not found.");

        const isMatch: boolean = await bcrypt.compare(password, findUser.password); // check the password with user's password
        if(!isMatch) throw new Error("Email or password is wrong.");

        // if it's not verified user can not have any access to jwt tokens or protected endpoints.
        if(!findUser.verifyed) throw new Error("You should verify your account with link sent to your email.");

        // GeneratingJWT returns a object with type of Tokens that we use for tokens.
        const tokens: Tokens = await GeneratingJWT(findUser.email, findUser.id, false);

        return { tokens, message: "Login was successfull." };
    } catch (err: any) {
        throw new Error(err.message);
    }
}