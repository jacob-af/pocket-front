"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { ProfileImage } from "./Images";

export default function AmILoggedIn() {
  const { update } = useSession();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      console.log(session?.user);
      if (session?.user && session.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      } else if (session?.user) {
        setUserName(session.user.name);
        setUserImage(session.user.image || "");
      }
    }
    fetchSession();
  }, [update]);

  return (
    <div className="fixed top-2 left-2">
      {userImage !== "" ? <ProfileImage /> : ""}
    </div>
  );
}
