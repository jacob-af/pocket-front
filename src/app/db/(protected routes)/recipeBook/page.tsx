"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipeBookButton from "@/components/buttons/AddRecipeBookButton";
import { Bookshelf } from "@/components/recipeBook/display/Bookshelf";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export default function RecipeBook() {
  return (
    <div className="mt-11z flex h-screen flex-col">
      <Bookshelf />
    </div>
  );
}
