"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavMenu() {
  const pathname = usePathname();
  return (
    <div>
      <AuthButton />
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link>
        <Link href="/serverSideQuery">
          <li
            className={
              pathname === "/serverSideQuery" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>
        <Link href="/serverSideMutation">
          <li
            className={
              pathname === "/serverSideMutation" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Query from Server
          </li>
        </Link>
        <Link href="/clientSideQuery">
          <li
            className={
              pathname === "/clientSideQuery" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Query from Client
          </li>
        </Link>
        <Link href="/clientSideMutation">
          <li
            className={
              pathname === "/clientSideMutation" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Mutation from Client
          </li>
        </Link>
      </ul>
    </div>
  );
}
