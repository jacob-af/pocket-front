"use client";

import { getSession, useSession } from "next-auth/react";

import { ProfileImage } from "./ProfileImage";
import { useEffect } from "react";

export default function AmILoggedIn() {
  const { data: session, update, status } = useSession();

  useEffect(() => {
    async function fetchSession() {
      const sess = await getSession();
      console.log(sess, "use effect");
      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        console.log("new tokens");
        update({ action: "New Tokens" });
      }
    }
    fetchSession();
  });

  console.log(session, status, ": profile picture");
  return (
    <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
      {status === "authenticated" ? session.user.name : "not loaded"}
      <ProfileImage url={session?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
