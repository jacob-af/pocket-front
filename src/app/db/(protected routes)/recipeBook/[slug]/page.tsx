"use client";

import { selectedRecipe, userRecipeList } from "@/graphql/reactiveVar/recipes";
import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import { GET_RECIPE_BOOK } from "@/graphql/mutations/recipeBook";
import ShortCard from "@/components/recipe/display/ShortCard";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useEffect } from "react";

export default function RecipeBook({ params }: { params: { slug: string } }) {
  const book = useReactiveVar(selectedRecipeBook);
  const { data, loading, error } = useQuery(GET_RECIPE_BOOK, {
    variables: { name: params.slug },
    fetchPolicy: "cache-and-network"
  });
  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  useEffect(() => {
    if (data?.recipeBook) {
      console.log(data?.recipeBook);
      selectedRecipeBook(data.recipeBook);
    }
  }, [data?.recipeBook]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There is no page here</div>;
  }

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto pt-4 m-0 box-border">
      {/* AddRecipe button */}
      {/* Map over the configurations for column sizes */}
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
  );
}
