import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import prisma from "#/lib/db";
import { users } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

const getUser = async (email: string): Promise<users | null> => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log("🤬 ~ file: auth.ts:17 ~ getUser ~ error:", error);
    throw new Error("Unable to find user");
  }
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
            };
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
