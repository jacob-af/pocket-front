"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AmILoggedIn() {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (session?.user && session?.user?.accessTokenExpires < Date.now()) {
      update({ action: "New Tokens" });
    }
  });

  return (
    <div className="float float-left">Logged in as: {session?.user.name}</div>
  );
}
