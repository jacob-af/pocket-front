"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";

export default function AmILoggedIn() {
  const { update } = useSession();
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user && session.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      }
    }
    fetchSession();
  }, [update]);

  return (
    <div className="fixed left-2 top-2">
      <ProfileImage />
    </div>
  );
}
