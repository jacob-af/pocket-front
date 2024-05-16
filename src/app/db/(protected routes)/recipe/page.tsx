"use client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import RecipeLoader from "@/components/recipe/RecipeLoader";
import ShortCard from "@/components/recipe/display/ShortCard";
import { useReactiveVar } from "@apollo/client";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export default function Recipe() {
  const recipeList = useReactiveVar(userRecipeList);

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <>
      <div className="bg-background mt-12 flex w-full max-w-2xl items-center justify-center">
        <RecipeLoader />
      </div>
      <div className="mt-10 box-border grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* AddRecipe button */}
        <div className="fixed right-2 top-12 z-40">
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
    </>
  );
}
