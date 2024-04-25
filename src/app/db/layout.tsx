"use server";

import * as React from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <SideBar />
      <div className="container flex pt-12 justify-center">{children}</div>
    </main>
  );
}
