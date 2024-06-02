"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipeBookButton from "@/components/buttons/AddRecipeBookButton";
import { Bookshelf } from "@/components/recipeBook/display/Bookshelf";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export default function RecipeBook() {
  return (
    <div className="mt-12 flex h-screen flex-col">
      <div className="fixed right-2 top-12 z-10">
        <AddRecipeBookButton />
      </div>
      <Bookshelf />
    </div>
  );
}
