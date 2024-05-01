"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ApolloPayloadResult,
  FetchResult,
  QueryResult,
  useMutation,
  useReactiveVar
} from "@apollo/client";
import { LOG_OUT } from "../../graphql/mutations/auth";
import { useRouter } from "next/navigation";
import { authTokens } from "@/app/graphql/reactiveVar/authTokens";
import localForage from "localforage";
import { useEffect } from "react";

function Button() {
  const { data: session } = useSession();
  const [logOut, { loading, client }] = useMutation(LOG_OUT);

  const token = useReactiveVar(authTokens);
  console.log(token);
  // if (session?.user) {
  //   console.log("auth token set");
  // }

  authTokens(session?.user.accessToken);
  const onClick = async () => {
    try {
      if (session) {
        console.log(session);
        const { data }: FetchResult<{ loggedOut: boolean }> = await logOut({
          variables: { userId: session.user.id }
        });
        localForage.clear();
        authTokens("");
        client.clearStore();
        console.log(data?.loggedOut);
        await signOut({
          callbackUrl: `/welcome`,
          redirect: true
        });
      } else {
        authTokens("");
        client.clearStore();
        await signOut({
          callbackUrl: `/welcome`,
          redirect: true
        });
      }
      return;
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <>
      {session?.user.accessToken === token ? "true" : "false"}
      {token ? token.length : ""}
      <button onClick={onClick}>Sign out</button>
    </>
  );
}

export default function AuthButton() {
  return (
    <div>
      <Button />
    </div>
  );
}
