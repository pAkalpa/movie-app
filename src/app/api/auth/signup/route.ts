import { NextRequest, NextResponse } from "next/server";
import prisma from "#/lib/db";
import { Prisma } from "@prisma/client";
import { ILoginRegister } from "#/lib/types";
import bcrypt from "bcrypt";

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

export async function POST(request: NextRequest) {
  const body: ILoginRegister = await request.json();
  try {
    await prisma.users.create({
      data: {
        email: body.email,
        password: await hashPassword(body.password),
      },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("🤬 ~ file: route.ts:17 ~ POST ~ error:", error.code);
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 400 }
        );
      }
    }
    console.log("🤬 ~ file: route.ts:25 ~ POST ~ error:", error);
    return NextResponse.json(
      { error: "Unable to create user" },
      { status: 500 }
    );
  }
}
