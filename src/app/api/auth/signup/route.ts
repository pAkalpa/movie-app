import { Prisma } from "@prisma/client";
import { ILoginRegister } from "#/lib/types";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "#/functions/db/dbFunctions";

const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("🤬 ~ file: route.ts:9 ~ hashPassword ~ error", error);
    throw new Error("Unable to hash password");
  }
};

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const body: ILoginRegister = await request.body.json();
  try {
    await createUser({
      email: body.email,
      password: await hashPassword(body.password),
    });
    return response.status(201).json({ success: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("🤬 ~ file: route.ts:17 ~ POST ~ error:", error.code);
      if (error.code === "P2002") {
        return response.status(400).json({ error: "Email already exists" });
      }
    }
    console.log("🤬 ~ file: route.ts:25 ~ POST ~ error:", error);
    return response.status(500).json({ error: "Unable to create user" });
  }
}
