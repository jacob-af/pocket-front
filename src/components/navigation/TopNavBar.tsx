"use server";

import AmILoggedIn from "@/components/images/ProfilePictureSmall";
import AuthButton from "@/components/buttons/SignOutButton";
import Link from "next/link";

export default async function TopNavBar() {
  return (
    <nav className="bg-contrast fixed z-50 box-border flex h-12 w-screen items-center justify-center">
      <AmILoggedIn />
      <Link href="/db" className="">
        Pocket
      </Link>
      <AuthButton />
      {/* <RecipeLoader /> */}
    </nav>
  );
}
