"use server";

import Link from "next/link";
import AmILoggedIn from "./AreYouLoggedIn";
import AuthButton from "./SignOutButton";

export default async function NavBar() {
  return (
    <nav className="container fixed flex justify-between content-center py-2">
      <AmILoggedIn />
      <Link href="/db">Pocket</Link>
      <AuthButton />
    </nav>
  );
}
