"use client";

import { FetchResult, useMutation } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { LOG_OUT } from "../../graphql/mutations/auth";
import { Session } from "next-auth";
import localForage from "localforage";

function Button() {
  const [logOut, { client }] = useMutation(LOG_OUT);
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
    } catch (err) {
      console.log(err);
      return;
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
