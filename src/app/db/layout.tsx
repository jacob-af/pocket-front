"use server";

import * as React from "react";

import { AlertDisplay } from "@/components/alerts/AlertDisplay";
import BottomNavBar from "@/components/navigation/BottomNavBar";
import RightSideBar from "@/components/navigation/RightSideBar";
import SideBar from "@/components/navigation/SideBar";
import TopNavBar from "@/components/navigation/TopNavBar";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen overflow-hidden">
      <SideBar />
      <RightSideBar />
      <TopNavBar />
      <div className="box-border flex h-full w-screen flex-grow justify-center md:pb-0">
        {children}
      </div>

      <AlertDisplay />
      <BottomNavBar />
    </main>
  );
}
