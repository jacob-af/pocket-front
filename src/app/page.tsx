import AuthButton from "@/app/components/buttons/SignOutButton";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";
import { auth } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    redirect("/welcome");
  }
  redirect("/db");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 bg-black">
      Welcome - you will be redirected shortly.
    </main>
  );
}
