import AuthButton from "@/components/buttons/SignOutButton";
import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-background flex h-full min-h-screen flex-col items-center px-24">
      <div className="my-auto max-w-md text-center align-middle">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to the Pocket Bar Book
        </h1>
        <p className="mb-8">
          A recipe manage apped designed for bartenders first. Keep track of
          different builds, version control for recipe development. Share with
          your team. Manage inventory and run cost.
        </p>
        <Link
          href="signup"
          className="btn-primary mr-4 inline-block rounded bg-white px-5 py-3 text-black hover:bg-gray-300"
        >
          Sign Up
        </Link>
        <Link
          href="login"
          className="btn-secondary mr-4 inline-block rounded bg-gray-600 px-5 py-3 text-white hover:bg-gray-900"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
