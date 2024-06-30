"use client";

import { Bookshelf } from "@/components/recipeBook/display/Bookshelf";
import { useBookshelf } from "@/hooks/useBookShelf";

export default function RecipeBook() {
  return (
    <div className="mt-11z flex h-screen flex-col">
      <Bookshelf useBookshelf={useBookshelf} />
    </div>
  );
}
