"use client";

import Link from "next/link";
import React from "react";

export function PublicNavBar() {
  return (
    <div className="bg-background fixed top-0 z-20 flex w-full justify-between">
      <Link href="/welcome" className="p-2">
        Pocket
      </Link>
      <div className="flex space-x-4">
        <Link href="/signup" className="p-2">
          Sign Up
        </Link>
        <Link href="/login" className="p-2">
          Login
        </Link>
      </div>
    </div>
  );
}
