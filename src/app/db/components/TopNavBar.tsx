"use server";

import Link from "next/link";
import AmILoggedIn from "./AreYouLoggedIn";
import AuthButton from "./SignOutButton";

export default async function TopNavBar() {
  return (
    <nav className="fixed flex flex-grow w-screen justify-between content-center py-2 border">
      <AmILoggedIn />
      <Link href="/db">Pocket</Link>
      <AuthButton />
    </nav>
  );
}
