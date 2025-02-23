import prisma from "../../prisma/PrismaClient";
import { Validation } from "../Utils/ValidateUser";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { v4 as uuid4 } from "uuid";
import { NowTime } from "../Utils/NowTime";

export type User = {
  email: string;
  fullname: string;
  id: number;
};

export const RegisterService = async (fullname: string, email: string, password: string): Promise<string> => {

  try {
    Validation.ValidateUser(fullname, email, password);

    const isUserExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isUserExist) throw new Error("User already exist.");

    const verifycode: string = uuid4();

    const iscodeunique = await prisma.user.findUnique({
      where: { verify_code: verifycode },
    });

    if (iscodeunique)
      throw new Error(
        "There is a problem generating verification code in server, try again."
      );

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILSENDERPASS
      },
      logger: true,
      debug: true
    })

    const verificationlink: string = `http://localhost:3000/api/auth/verifyaccount?token=${verifycode}&user=${email}`;

    const mailoptions: object = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: 'Verify your email please !',
      html: `
        <p>Hello ${email},</p>
        <p>Welcome to our website!</p>
        <p>Please <a href="${verificationlink}">click here</a> to verify your account.</p>
        <p>Thank you!</p>
      `,
    }

    await transporter.sendMail(mailoptions);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        fullname: fullname,
        password: hashedPassword,
        verifyed: false,
        created_at: NowTime(),
        updated_at: NowTime(),
        verify_code: verifycode,
      },
      select: { email: true, fullname: true, id: true },
    });

    return "Great! we sent a link to your email address, please click on it to verify your account.";

  } catch (err: any) {
    throw new Error(err.message);
  }

};