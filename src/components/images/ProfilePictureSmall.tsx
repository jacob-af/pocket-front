"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";
import { useRouter } from "next/navigation";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      const sess = await getSession();
      console.log(sess, "this is the current session");
      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      }
      if (sess?.user && !session) {
        console.log("ping", sess.user.name);
        console.log("pong");
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
