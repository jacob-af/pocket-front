import AuthButton from "@/components/buttons/SignOutButton";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }
  redirect("/login");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black px-24">
      Welcome - you will be redirected shortly.
    </main>
  );
}
