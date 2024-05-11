"use server";

import * as React from "react";

import { AlertDisplay } from "@/components/alerts/AlertDisplay";
import BottomNavBar from "@/components/navigation/BottomNavBar";
import SideBar from "@/components/navigation/SideBar";
import TopNavBar from "@/components/navigation/TopNavBar";

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
      <div className="flex flex-grow h-full w-screen box-border mt-12 lg:mx-60 pb-26 md:pb-0 float-right justify-center">
        {children}
      </div>

      <BottomNavBar />
    </main>
  );
}
