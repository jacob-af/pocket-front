"use client";

import { getSession, useSession } from "next-auth/react";

import { ProfileImage } from "./ProfileImage";
import { useEffect } from "react";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();

  useEffect(() => {
    async function fetchSession() {
      const sess = await getSession();
      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
      }
    }
    fetchSession();
  });

  return (
    <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
      {session?.user.name ? session.user.name : "not loaded"}
      <ProfileImage url={session?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
