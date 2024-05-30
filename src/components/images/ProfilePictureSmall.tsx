"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";
import { useRouter } from "next/navigation";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session, "from prof picture");
    async function fetchSession() {
      const session = await getSession();
      console.log(session, "this is the current session");
      if (session?.user && session.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      }
      if (!session?.user) {
        router.push("/login");
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
