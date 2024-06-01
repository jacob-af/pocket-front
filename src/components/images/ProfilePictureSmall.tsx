"use client";

import { getSession, useSession } from "next-auth/react";

import { ProfileImage } from "./ProfileImage";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();

  useEffect(() => {
    async function fetchSession() {
      const sess = await getSession();
      console.log(sess, "this is the current session");
      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
      }
      if (sess?.user && !session) {
        console.log("ping", sess.user.name);
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
