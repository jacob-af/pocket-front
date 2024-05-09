import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
    status: string;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
  }
}
