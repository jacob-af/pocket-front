"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";
import { Session } from "next-auth/";

export default function AmILoggedIn() {
  const { data: session, update, status } = useSession();
  const [sessi, setSessi] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      const sess = await getSession();
      console.log(sess, "use effect");
      setSessi(sess);
      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        console.log("new tokens");
        update({ action: "New Tokens" });
      }
      if (status === "unauthenticated") {
        console.log("auth tokens");
        update({ action: "New Tokens" });
      }
    }
    fetchSession();
  }, [update, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log(sessi, status, ": profile picture");
  return (
    <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
      {sessi?.user.name ? sessi.user.name : "not loaded"}
      <ProfileImage url={sessi?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
