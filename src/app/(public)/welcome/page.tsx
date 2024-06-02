import AuthButton from "@/components/buttons/SignOutButton";
import { BreakPoint } from "@/components/images/CardBorder";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center overflow-hidden text-center">
      <h1 className="text-4xl font-bold">Welcome to the Pocket Bar Book</h1>
      <p className="my-4">
        A recipe management app designed for working bartenders. Keep track of
        different builds, version control for recipe development. Share with
        your team. Manage inventory and run cost. Put it all in your Pocket.
      </p>
      <Link href="/recipe" passHref className="my-8 text-xl">
        Search Public Recipes
      </Link>
      <div>
        <BreakPoint />
      </div>
      <div className="my-8 flex flex-row items-center justify-center">
        <Link
          href="signup"
          className="btn-primary mx-3 inline-block rounded bg-white p-2 text-black hover:bg-gray-300"
        >
          Sign Up
        </Link>
        <Link
          href="login"
          className="btn-secondary mx-3 inline-block rounded bg-gray-600 p-2 text-white hover:bg-gray-900"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
