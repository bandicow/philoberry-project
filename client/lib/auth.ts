import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma";

export const authConfig: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // credentials 객체의 검증
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        if (!credentials.email) {
          throw new Error("No email provided");
        }
        if (!credentials.password) {
          throw new Error("No password provided");
        }

        // 사용자 정보의 검증
        const dbUser = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!dbUser) {
          throw new Error("No user found with this email");
        }

        if (!dbUser.hashedPassword) {
          throw new Error("User has no password");
        }

        const passwordIsValid = await bcrypt.compare(
          credentials.password,
          dbUser.hashedPassword
        );

        if (!passwordIsValid) {
          throw new Error("Invalid password");
        }

        // 반환하는 사용자 정보
        const { hashedPassword, ...dbUserWithoutPassword } = dbUser;

        return { ...dbUserWithoutPassword, id: String(dbUser.id) }; // Convert id to string.
      },
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/api/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};
