"use client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import { RecipeBox } from "../../../../components/recipe/display/RecipeBox";
import RecipeLoader from "@/components/recipe/RecipeLoader";

export default function RecipePage() {
  return (
    <>
      <div className="bg-background mt-20 flex w-full max-w-2xl items-center justify-center">
        <RecipeLoader />
      </div>
      <div className="mt-10 box-border grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* AddRecipe button */}
        <div className="fixed right-2 top-12 z-40">
          <AddRecipe />
        </div>
        <RecipeBox />
        {/* Map over the configurations for column sizes */}
      </div>
    </>
  );
}
