"use server";

import * as React from "react";

import RecipeLoader from "@/components/recipe/RecipeLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full max-w-2xl flex-col items-center justify-center">
      <div className="flex w-full items-center justify-center bg-black">
        <RecipeLoader />
      </div>

      {children}
    </div>
  );
}
