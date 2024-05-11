"use server";

import * as React from "react";

import RecipeBookLoader from "@/app/components/recipeBook/RecipeBookLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row w-full bg-black">
        <RecipeBookLoader />
      </div>
      {children}
    </div>
  );
}
