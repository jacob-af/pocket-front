"use client";

import {
  selectedRecipeBook,
  userRecipeBookList
} from "@/graphql/reactiveVar/recipeBooks";
import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipeBookButton from "@/components/buttons/AddRecipeBookButton";
import BookCover from "@/components/recipeBook/BookCover";
import { Build } from "@/__generated__/graphql";
import ShortCard from "@/components/recipe/display/ShortCard";

export default function RecipeBook() {
  const bookList = useReactiveVar(userRecipeBookList);
  console.log(bookList);
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div>
      <div className="m-0 mb-14 box-border grid h-full w-full gap-4 overflow-auto pt-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="fixed right-2 top-12 z-10">
          <AddRecipeBookButton />
        </div>
        {columnConfigurations.map((columns, index) =>
          // Create a div for each column configuration
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "grid md:hidden" : ""
              } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
                index === 2 ? "hidden xl:grid" : ""
              }`}
            >
              {bookList
                .filter((_, i) => i % num === columnIndex)
                .map(book => (
                  <BookCover key={book.id} book={book} />
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
