"use client";

import { FetchResult, useMutation, useReactiveVar } from "@apollo/client";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { LOG_OUT } from "../../graphql/mutations/auth";
import { Session } from "next-auth";
import { alertList } from "@/graphql/reactiveVar/alert";
import localForage from "localforage";

function Button() {
  const [logOut, { client }] = useMutation(LOG_OUT);
  const alerts = useReactiveVar(alertList);
  //const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   const fetchSession = async () => {
  //     const sessionData = await getSession();
  //     setSession(sessionData);
  //   };

  //   fetchSession();
  // }, []);
  const { data: session } = useSession();

  const onClick = async () => {
    try {
      if (session) {
        const { data }: FetchResult<{ loggedOut: boolean }> = await logOut({
          variables: { userId: session.user.id }
        });
        localForage.clear();

        client.clearStore();
        await signOut({
          callbackUrl: `/welcome`,
          redirect: true
        });
      } else {
        client.clearStore();
        await signOut({
          callbackUrl: `/login`,
          redirect: true
        });
      }
      return;
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alertList([...alerts, { code: "error", message: errorMessage }]);
      console.log(error);
    }
  };

  if (session) {
    return <button onClick={onClick}>Sign out</button>;
  }
  return <button onClick={onClick}>Sign in</button>;
}

export default function AuthButton() {
  return (
    <div className="p-2">
      <Button />
    </div>
  );
}
