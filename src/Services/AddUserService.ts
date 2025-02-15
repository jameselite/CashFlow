import prisma from "../../prisma/PrismaClient";
import { Validation } from "../Utils/ValidateUser";
import bcrypt from "bcryptjs";

export type User = {
  email: string,
  fullname: string
}

export type ErrorType = {
  error: string
}

export const RegisterService = async (fullname: string,email: string,password: string): Promise<User | ErrorType> => {
  try {
    Validation.ValidateUser(fullname, email, password);

    const isUserExist = await prisma.user.findUnique({
      where: { email: email }
    });

    if (isUserExist) throw new Error("User already exist.");

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email: email, fullname: fullname, password: hashedPassword },
      select: { email: true, fullname: true }
    });

    return newUser;
  } catch (err: any) {
    const error: ErrorType = { error : err.message };
    return error;
  }
};