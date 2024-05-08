"use server";

import * as React from "react";

import { AlertDisplay } from "./components/AlertDisplay";
import BottomNavBar from "./components/BottomNavBar";
import SideBar from "./components/SideBar";
import TopNavBar from "./components/TopNavBar";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen">
      <TopNavBar />
      <SideBar />
      <AlertDisplay />
      <div className="flex flex-grow h-full w-screen box-border mt-12 lg:mx-60 border pb-26 md:pb-0 float-right justify-center">
        {children}
      </div>
      <BottomNavBar />
    </main>
  );
}
