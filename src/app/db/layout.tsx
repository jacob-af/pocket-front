"use server";

import * as React from "react";
import TopNavBar from "./components/TopNavBar";
import SideBar from "./components/SideBar";
import BottomNavBar from "./components/BottomNavBar";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen">
      <TopNavBar />
      <SideBar />
      <div className="flex flex-grow h-screen mt-12 lg:ml-60 border float-right justify-center">
        {children}
      </div>
      <BottomNavBar />
    </main>
  );
}
