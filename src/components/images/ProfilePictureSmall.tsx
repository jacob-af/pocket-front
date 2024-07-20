"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Link from "next/link";
import { ProfileImage } from "./ProfileImage";

export default function AmILoggedIn() {
  const { data: session, update, status } = useSession();

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession();
      console.log(sess, "use effect");

      if (sess?.user && sess.user.accessTokenExpires < Date.now()) {
        console.log("new tokens");
        update({ action: "New Tokens" });
      }
    };

    if (status === "authenticated") {
      fetchSession();
    }
  }, [status, update]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center pl-3 pt-3">
        Loading...
      </div>
    );
  }

  console.log(session, status, ": profile picture");
  return (
    <Link href="/db/profile">
      <div className="flex flex-col items-center justify-center pl-3 pt-6">
        <ProfileImage
          url={session?.user.image || "/portrait-placeholder.png"}
        />
      </div>
    </Link>
  );
}
