"use client";

import { authTokens } from "@/app/graphql/reactiveVar/authTokens";
import { useSession, getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AmILoggedIn() {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.user && session?.user?.accessTokenExpires < Date.now()) {
      console.log("new tokens");
      update({ action: "New Tokens" });
    }
    authTokens(session?.user.accessToken);
  });

  useEffect(() => {
    // Fetch the session asynchronously
    async function fetchSession() {
      const session = await getSession();
      console.log("async hit:", session);
      // Once the session is available, extract the token and set it in the Apollo reactive variable
      if (session && session.user.accessToken) {
        authTokens(session.user.accessToken);
      }
    }
    // Call the fetchSession function
    fetchSession();
  }, []);

  return (
    <div className="float float-left">Logged in as: {session?.user.name}</div>
  );
}
