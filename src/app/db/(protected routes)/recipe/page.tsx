"use client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import ShortCard from "@/components/recipe/display/ShortCard";
import { useReactiveVar } from "@apollo/client";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export default function Recipe() {
  const recipeList = useReactiveVar(userRecipeList);

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto pt-4 m-0 box-border">
      {/* AddRecipe button */}
      <div className="fixed top-12 right-2 z-40">
        <AddRecipe />
      </div>
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
            {recipeList
              .flatMap(recipe => recipe.userBuild)
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
