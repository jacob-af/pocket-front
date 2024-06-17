"use server";

import * as React from "react";

import RecipeBookLoader from "@/components/recipeBook/RecipeBookLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center">
      <div className="relative z-10 flex w-full flex-row items-center justify-center">
        <RecipeBookLoader />
      </div>
      {children}
    </div>
  );
}
