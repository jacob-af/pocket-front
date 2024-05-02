"use client";

import { authTokens } from "@/app/graphql/reactiveVar/authTokens";
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AmILoggedIn() {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.user && session.user.accessTokenExpires < Date.now()) {
      update({ action: "New Tokens" });
      console.log("new tokens");
    }
  });

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      // if (session && session.user.accessToken !== "") {
      //   console.log(
      //     session.user.accessToken.slice(210, -1),
      //     session?.user.name
      //   );
      //   authTokens(session.user.accessToken);
      // }
      if (!session?.user.name) {
        console.log("hit");
        update();
      }
    }
    fetchSession();
  }, [update]);

  return (
    <div className="float float-left">Logged in as: {session?.user.name}</div>
  );
}
