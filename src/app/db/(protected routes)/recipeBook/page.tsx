"use client";

import {
  selectedRecipeBook,
  userRecipeBookList
} from "@/graphql/reactiveVar/recipeBooks";
import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipeBookButton from "@/components/buttons/AddRecipeBookButton";
import BookCover from "@/components/recipeBook/display/BookCover";
import { Bookshelf } from "./Bookshelf";

export default function RecipeBook() {
  const bookList = useReactiveVar(userRecipeBookList);
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="mb-24 mt-12 box-border flex h-screen flex-col">
      <div className="fixed right-2 top-12 z-10">
        <AddRecipeBookButton />
      </div>
      <Bookshelf />
    </div>
  );
}
