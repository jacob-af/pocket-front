"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ApolloPayloadResult,
  FetchResult,
  QueryResult,
  useMutation
} from "@apollo/client";
import { LOG_OUT } from "../../graphql/mutations/auth";
import { useRouter } from "next/navigation";
import { authTokens } from "@/app/graphql/reactiveVar/authTokens";
import localForage from "localforage";
import { useEffect } from "react";

function Button() {
  const { data: session } = useSession();
  const [logOut, { loading, client }] = useMutation(LOG_OUT);

  useEffect(() => {
    if (session?.user && session?.user?.accessTokenExpires < Date.now()) {
      authTokens(session.user.accessToken);
    }
  });

  const onClick = async () => {
    try {
      if (session) {
        console.log(session.status);
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
