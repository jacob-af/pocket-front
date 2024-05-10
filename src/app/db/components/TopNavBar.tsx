"use server";

import AmILoggedIn from "./AmILoggedIn";
import AuthButton from "./SignOutButton";
import Link from "next/link";
import RecipeLoader from "../(protected routes)/recipe/components/RecipeLoader";

export default async function TopNavBar() {
  return (
    <nav className="fixed flex w-screen h-12 box-border bg-black z-10 text-center items-center">
      <AmILoggedIn />
      <Link href="/db" className="">
        Pocket
      </Link>
      <AuthButton />
      {/* <RecipeLoader /> */}
    </nav>
  );
}
