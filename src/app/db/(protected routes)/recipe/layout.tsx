"use server";

import * as React from "react";

import RecipeLoader from "@/components/recipe/UserRecipeLoader";

export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background flex h-full w-full max-w-2xl flex-col items-center justify-center">
      {children}
    </div>
  );
}
