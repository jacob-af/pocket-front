import { FetchResult, QueryResult } from "@apollo/client";

import { AuthPayload } from "@/__generated__/graphql";
import CredentialsProvider from "next-auth/providers/credentials";
//import { request } from "graphql-request";
import { LOGIN } from "@/graphql/mutations/auth";
import { getClient } from "@/lib/client";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: {
      label: "Email",
      type: "text",
      placeholder: "jsmith@email.com"
    },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    const client = await getClient();
    try {
      const { data }: FetchResult<{ login: AuthPayload }> = await client.mutate(
        {
          mutation: LOGIN,
          variables: {
            loginInput: {
              email: credentials?.email,
              password: credentials?.password
            }
          }
        }
      );
      const login = data?.login;
      if (login) {
        return {
          accessToken: login.accessToken,
          refreshToken: login.refreshToken,
          accessTokenExpires: Date.now() + 24 * 60 * 60 * 1000,
          id: login.user.id,
          email: login.user.email,
          name: login.user.userName,
          image: login.user.profile?.image || null
        };
      }
    } catch (err) {
      console.log(err);
    }
    return null;
  }
});
