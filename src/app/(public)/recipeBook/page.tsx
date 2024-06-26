"use client";

import { Bookshelf } from "@/components/recipeBook/display/Bookshelf";

export default function RecipeBook() {
  return (
    <div className="mb-24 mt-12 box-border flex h-screen flex-col">
      <Bookshelf />
    </div>
  );
}
