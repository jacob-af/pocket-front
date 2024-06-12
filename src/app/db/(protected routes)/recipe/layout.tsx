"use server";

import * as React from "react";

import RecipeLoader from "@/components/recipe/UserRecipeLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex h-full w-full max-w-3xl flex-col items-center justify-center xl:max-w-4xl">
      <div className="bg-background mt-16 flex w-full max-w-3xl items-center justify-center">
        <RecipeLoader />
      </div>
      {children}
    </div>
  );
}
