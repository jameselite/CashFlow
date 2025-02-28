import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export type Tokens = {
    accessToken: string
    refreshToken: string
}

export const GeneratingJWT = async (email: string, id: number, isadmin: boolean): Promise<Tokens> => {

    try {

        const accessToken: string = await jwt.sign({ id: id, email: email, isadmin: isadmin }, process.env.JWT_ACCESS!, { expiresIn: '15m' });
        const refreshToken: string = await jwt.sign({ id: id, email: email, isadmin: isadmin }, process.env.JWT_REFRESH!, { expiresIn: '90d' });

        const bothTokens: Tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }

        return bothTokens;

    } catch (err: any) {

        throw new Error(err.message);

    }
}