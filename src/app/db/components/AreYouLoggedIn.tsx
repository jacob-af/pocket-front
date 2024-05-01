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
      console.log(status);
      const session = await getSession();
      console.log(session);
      if (session && session.user.accessToken) {
        authTokens(session.user.accessToken);
      }
      console.log("async hit:", session);
      console.log("async hit:", session?.user.name);
      await getSession();
    }
    // Call the fetchSession function
    fetchSession();
  }, [status]);

  return (
    <div className="float float-left">Logged in as: {session?.user.name}</div>
  );
}
