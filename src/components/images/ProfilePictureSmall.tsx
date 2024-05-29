"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./ProfileImage";

export default function AmILoggedIn() {
  const { data: session, update } = useSession();
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    console.log(session);
    async function fetchSession() {
      if (
        (session?.user && session.user.accessTokenExpires < Date.now()) ||
        !session?.user.name
      ) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      }
    }
    fetchSession();
  });

  return (
    <div className="fixed left-2 top-2">
      {session?.user.name ? session.user.name : "not loaded"}
      <ProfileImage />
    </div>
  );
}
