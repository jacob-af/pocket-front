"use client";

import { ProfileImage } from "./ProfileImage";
import { useSession } from "next-auth/react";

export default function AmILoggedIn() {
  const { data: session } = useSession();

  return (
    <div className="fixed left-2 top-2 flex flex-col items-center justify-center">
      {session?.user.name ? session.user.name : "not loaded"}
      <ProfileImage url={session?.user.image || "/portrait-placeholder.png"} />
    </div>
  );
}
