"use server";

import AmILoggedIn from "@/components/images/ProfilePictureSmall";
import AuthButton from "@/components/buttons/SignOutButton";
import Link from "next/link";

export default async function TopNavBar() {
  return (
    <nav className="z-90 bg-contrast fixed box-border flex h-12 w-screen items-center justify-center">
      <AmILoggedIn />
      <Link href="/db" className="">
        Pocket
      </Link>
      <AuthButton />
      {/* <RecipeLoader /> */}
    </nav>
  );
}
