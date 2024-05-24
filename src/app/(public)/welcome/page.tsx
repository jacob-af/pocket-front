import AuthButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex h-full w-full max-w-xl flex-col items-center text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Welcome to the Pocket Bar Book
      </h1>
      <p className="mb-8">
        A recipe manage apped designed for working bartenders. Keep track of
        different builds, version control for recipe development. Share with
        your team. Manage inventory and run cost. Put it all in your Pocket.
      </p>
      <div className="flex flex-row items-center justify-center">
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
