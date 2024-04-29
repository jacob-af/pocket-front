import AuthButton from "@/app/db/components/SignOutButton";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24">
      <div className="max-w-md text-center align-middle my-auto">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Pocket Bar Book
        </h1>
        <p className="mb-8">
          A recipe manage apped designed for bartenders first. Keep track of
          different builds, version control for recipe development. Share with
          your team. Manage inventory and run cost.
        </p>
        <Link
          href="signup"
          className="btn-primary inline-block bg-white text-black px-5 py-3 rounded hover:bg-gray-300 mr-4"
        >
          Sign Up
        </Link>
        <Link
          href="login"
          className="btn-secondary inline-block bg-gray-600 text-white px-5 py-3 rounded hover:bg-gray-900 mr-4"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
