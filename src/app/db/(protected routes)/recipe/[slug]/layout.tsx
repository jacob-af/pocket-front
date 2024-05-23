"use server";

import * as React from "react";

import RecipeLoader from "@/components/recipe/UserRecipeLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex w-full items-center justify-center">
        <RecipeLoader />
      </div>
      {children}
    </>
  );
}
