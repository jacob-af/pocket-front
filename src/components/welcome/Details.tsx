import Link from "next/link";

export default function Details() {
  return (
    <div className="flex min-h-screen w-screen snap-center flex-col items-center justify-center text-center text-2xl">
      <ul>
        <li>Upload Photos of your Cocktails</li>
        <li>Import and Export Recipe Books as CSV</li>
        <li>Download App to Home Screen</li>
        <li>Contact Admin to Sign in with Google</li>
        <li>More Features Coming Soon</li>
      </ul>
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
    </div>
  );
}
