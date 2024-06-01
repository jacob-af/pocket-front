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
    <main className="box-border flex min-h-screen w-screen overflow-x-hidden">
      <SideBar />
      <RightSideBar />
      <TopNavBar />
      <div className="box-border flex h-full w-screen flex-col items-center justify-center overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      <AlertDisplay />
      <BottomNavBar />
    </main>
  );
}
