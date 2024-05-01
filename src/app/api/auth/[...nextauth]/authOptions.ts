import { credentialsProvider } from "./credentialsProvider";
import type { NextAuthOptions } from "next-auth";
import { getClient } from "@/lib/client";
import { NEW_TOKENS } from "@/app/graphql/mutations/auth";
import { authTokens } from "@/app/graphql/reactiveVar/authTokens";

export const authOptions: NextAuthOptions = {
  providers: [credentialsProvider],
  pages: { signIn: "/login" },
  session: { maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
        authTokens(user.accessToken);
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          accessTokenExpires: user.accessTokenExpires,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken
        };
      }
      if (trigger === "update" && session.action === "New Tokens") {
        console.log("closer");
        const client = await getClient();
        console.log(token);
        const data: any = await client.mutate({
          mutation: NEW_TOKENS,
          variables: {
            refreshToken: token.refreshToken
          },
          context: {
            headers: {
              Authorization: token.refreshToken
                ? `Bearer ${token.refreshToken}`
                : ""
            }
          }
        });
        const resp = data.data.getNewTokens;
        authTokens(resp?.accessToken);
        return {
          ...token,
          id: resp?.user.id,
          name: resp?.user.userName,
          email: resp?.user.email,
          accessTokenExpires: Date.now() + 23 * 60 * 60 * 1000,
          accessToken: resp?.accessToken,
          refreshToken: resp?.refreshToken
        };
      }
      return token;
    },
    async session({ token, session, user }) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires
        }
      };
    }
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   console.log(url, baseUrl);
    //   return baseUrl + "/";
    // }
  }
} satisfies NextAuthOptions;
