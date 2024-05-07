"use client";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AmILoggedIn() {
  const { update } = useSession();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      if (session?.user && session.user.accessTokenExpires < Date.now()) {
        update({ action: "New Tokens" });
        console.log("new tokens");
      } else if (session?.user) {
        setUserName(session.user.name);
      }
    }
    fetchSession();
  }, [update]);

  return (
    <div className="float float-left text-lg">Logged in as: {userName}</div>
  );
}
