import AuthButton from "@/app/db/components/SignOutButton";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-24">
      <div className="max-w-md text-center">
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
          className="btn-primary inline-block bg-blue-500 text-white px-5 py-3 rounded hover:bg-blue-600 mr-4"
        ></Link>
        <Link
          href="login"
          className="btn-secondary inline-block bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600 mr-4"
        >
          Login
        </Link>
        <AuthButton />
      </div>
    </main>
  );
}
