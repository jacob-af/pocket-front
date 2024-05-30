"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();

  useEffect(() => {
    console.log(session, "from prof picture");
    async function fetchSession() {
      const session = await getSession();
      if (session?.user && session.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      }
    }
    fetchSession();
  });

  return (
    <div className="fixed left-2 top-2">
      {session?.user.name ? session.user.name : "not loaded"}
      <ProfileImage url={session?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
