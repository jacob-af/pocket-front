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
  });

  return (
    <div className="float float-left">Logged in as: {session?.user.name}</div>
  );
}
