"use server";

import AmILoggedIn from "./AmILoggedIn";
import AuthButton from "./SignOutButton";
import Link from "next/link";
import RecipeLoader from "../(protected routes)/recipe/components/RecipeLoader";

export default async function TopNavBar() {
  return (
    <nav className="fixed flex flex-grow w-screen h-12 box-border bg-black z-10 justify-between items-center border">
      <AmILoggedIn />
      <Link href="/db">Pocket</Link>
      <AuthButton />
      {/* <RecipeLoader /> */}
    </nav>
  );
}
