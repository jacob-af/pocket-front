import { credentialsProvider } from "./credentialsProvider";
import type { NextAuthOptions } from "next-auth";
import { getClient } from "@/lib/client";
import { GOOGLE_SIGNIN, NEW_TOKENS } from "@/graphql/mutations/auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID
        ? process.env.GOOGLE_CLIENT_ID
        : "",
      clientSecret: process.env.GOOGLE_SECRET ? process.env.GOOGLE_SECRET : "'"
    }),
    credentialsProvider
  ],
  pages: { signIn: "/login" },
  session: { maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, account, profile, session, trigger }) {
      if (user) {
        if (account?.provider === "google" && profile) {
          const client = await getClient();
          const { data } = await client.mutate({
            mutation: GOOGLE_SIGNIN,
            variables: {
              googleUserId: account.providerAccountId,
              email: profile.email,
              name: profile.name,
              //image: token.picture,
              accessToken: account.access_token,
              tokenExpiry: account.expires_at
                ? new Date(account?.expires_at * 1000)
                : Date.now() + 24 * 60 * 60 * 1000
            }
          });
          const { user, accessToken, refreshToken } = data.googleSignIn;
          return {
            ...token,
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
            accessToken: accessToken,
            refreshToken: refreshToken
          };
        }
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
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
          image: token.image,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires
        }
      };
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to the dashboard after login
      return url === baseUrl ? `${baseUrl}/db` : url;
    }
  }
} satisfies NextAuthOptions;
