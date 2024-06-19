"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";
import { Session } from "next-auth/";

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
  }, [update, status]);

  if (status === "loading") {
    return (
      <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  console.log(session, status, ": profile picture");
  return (
    <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
      {session?.user.name ? session.user.name : "not loaded"}
      <ProfileImage url={session?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
