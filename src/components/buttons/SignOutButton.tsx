"use client";

import { FetchResult, useMutation, useReactiveVar } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";

import { LOG_OUT } from "../../graphql/mutations/auth";
import { alertList } from "@/graphql/reactiveVar/alert";
import localForage from "localforage";

function Button() {
  const [logOut, { client }] = useMutation(LOG_OUT);
  const alerts = useReactiveVar(alertList);

  const { data: session, status } = useSession();

  const onClick = async () => {
    try {
      console.log(status, session);
      if (
        status === "authenticated" &&
        session.user.accessTokenExpires > Date.now()
      ) {
        console.log("if");
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
      console.log(errorMessage);
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
