"use client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import ShortCard from "@/components/recipe/display/ShortCard";
// Import necessary dependencies
import { useReactiveVar } from "@apollo/client";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

// Define the Recipe component
export default function Recipe() {
  // Get the list of recipes using useReactiveVar hook
  const recipeList = useReactiveVar(userRecipeList);

  // Define a function to filter and flatten the recipes into columns
  const buildColumns = (num: number) =>
    recipeList
      .filter((_, index) => index % num === num - 1)
      .flatMap(recipe => recipe.userBuild);

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  // Return the JSX representing the Recipe component
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto pt-4 m-0 box-border">
      {/* AddRecipe button */}
      <div className="fixed top-12 right-2 z-40">
        <AddRecipe />
      </div>
      {/* Map over the configurations for column sizes */}
      {columnConfigurations.map((columns, index) =>
        // Create a div for each column configuration
        columns.map(num =>
          buildColumns(num).map(build => (
            <div
              key={index}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "md:hidden" : "hidden md:grid"
              } ${index === 2 ? "xl:grid-cols-3" : ""}`}
            >
              <ShortCard key={build.id} build={build} />
            </div>
          ))
        )
      )}
    </div>
  );
}
