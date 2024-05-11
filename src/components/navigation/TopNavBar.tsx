"use server";

import AmILoggedIn from "@/components/images/ProfilePictureSmall";
import AuthButton from "@/components/buttons/SignOutButton";
import Link from "next/link";

export default async function TopNavBar() {
  return (
    <nav className="fixed flex w-screen h-12 box-border bg-black z-10 justify-center items-center">
      <AmILoggedIn />
      <Link href="/db" className="">
        Pocket
      </Link>
      <AuthButton />
      {/* <RecipeLoader /> */}
    </nav>
  );
}
