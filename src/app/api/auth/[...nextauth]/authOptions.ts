import { credentialsProvider } from "./credentialsProvider";
import type { NextAuthOptions } from "next-auth";
import { getClient } from "@/lib/client";
import { NEW_TOKENS } from "@/app/graphql/mutations/auth";

export const authOptions: NextAuthOptions = {
  providers: [credentialsProvider],
  pages: { signIn: "/login" },
  session: { maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (user) {
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
      //This call back is triggered from the client, a better implementation surely exists.
      if (trigger === "update" && session.action === "New Tokens") {
        try {
          const client = await getClient();
          const { data } = await client.mutate({
            mutation: NEW_TOKENS,
            variables: { refreshToken: token.refreshToken },
            context: {
              headers: {
                Authorization: `Bearer ${token.refreshToken}`
              }
            }
          });

          const resp = data?.getNewTokens;
          if (resp) {
            return {
              ...token,
              id: resp.user.id,
              name: resp.user.userName,
              email: resp.user.email,
              accessTokenExpires: Date.now() + 23 * 60 * 60 * 1000,
              accessToken: resp.accessToken,
              refreshToken: resp.refreshToken
            };
          }
        } catch (error) {
          console.error("Error fetching new tokens: ", error);
        }
      }
      return token;
    },
    async session({ token, session, user }) {
      console.log("session callback hit");

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
  }
} satisfies NextAuthOptions;
