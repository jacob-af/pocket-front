"use server";

import AmILoggedIn from "@/components/images/ProfilePictureSmall";
import AuthButton from "@/components/buttons/SignOutButton";
import { Hamburger } from "@/components/images/Images";
import Link from "next/link";
import { OptionsPopout } from "@/components/options/OptionsPopout";

export default async function TopNavBar() {
  return (
    <nav className="bg-contrast fixed z-50 box-border flex h-12 w-screen items-center justify-between">
      <AmILoggedIn />
      <Link href="/db" className="text-4xl">
        Pocket
      </Link>
      <div className="pr-3">
        <OptionsPopout />
      </div>
    </nav>
  );
}
