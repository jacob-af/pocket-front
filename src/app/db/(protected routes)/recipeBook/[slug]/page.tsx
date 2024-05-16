"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { BookNavBar } from "@/components/recipeBook/display/BookActionBar";
import { GET_RECIPE_BOOK } from "@/graphql/mutations/recipeBook";
import ShortCard from "@/components/recipe/display/ShortCard";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useEffect } from "react";

export default function RecipeBook({ params }: { params: { slug: string } }) {
  const book = useReactiveVar(selectedRecipeBook);
  const q =
    params.slug.charAt(0).toUpperCase() +
    params.slug.slice(1).replace(/%20/g, " ");
  const { data, loading, error } = useQuery(GET_RECIPE_BOOK, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data?.recipeBook) {
      console.log(data.recipeBook);
      selectedRecipeBook(data.recipeBook);
    }
  }, [data?.recipeBook]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !book?.build) {
    return <div>There is no page here</div>;
  }

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="box-border flex h-screen w-full max-w-2xl flex-col items-center justify-center bg-black">
      <div className="m-0 mt-24 box-border grid h-full w-full grid-cols-1 gap-4 overflow-scroll md:grid-cols-2 xl:grid-cols-3">
        {columnConfigurations.map((columns, index) =>
          //{/* Create a div for each column configuration */}
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "grid md:hidden" : ""
              } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
                index === 2 ? "hidden xl:grid" : ""
              }`}
            >
              {/* Calculate the starting index for this column's builds */}
              {book.build
                .filter((_, i) => i % num === columnIndex)
                .map(build => (
                  <ShortCard key={build.id} build={build} />
                ))}
            </div>
          ))
        )}
      </div>
      <BookNavBar book={book} />
    </div>
  );
}
