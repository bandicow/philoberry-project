import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userName: string;
      name: string;
      email: string;
      address: string;
      zip: string;
      role: string;
      accessToken?: string;
    };
  }
}

declare module "next-auth" {
  interface User extends User {
    accessToken?: string; // 추가된 부분
  }
}