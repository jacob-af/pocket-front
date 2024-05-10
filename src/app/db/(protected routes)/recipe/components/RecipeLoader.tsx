"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import RecipeDropDown from "./RecipeDropDown";
import { USER_RECIPES } from "@/app/graphql/queries/recipe";
import { useEffect } from "react";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function RecipeLoader() {
  const { data, error, loading } = useQuery(USER_RECIPES, {
    fetchPolicy: "cache-and-network"
  });
  const recipeList = useReactiveVar(userRecipeList);

  useEffect(() => {
    if (data?.userRecipe) {
      const recipes = data?.userRecipe
        .filter(recipe => {
          return recipe?.userBuild.length > 0;
        })
        .map((recipe: Recipe) => {
          return {
            ...recipe,
            build: recipe.userBuild
          };
        });
      userRecipeList(recipes);
    }
  }, [data?.userRecipe]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
      <div className="lg:row-span-1 flex items-center justify-center">
        {recipeList.length === 0 && loading
          ? "Loading..."
          : recipeList.length > 0 && loading
          ? `${recipeList.length} Recipes Loaded From Cache`
          : `${recipeList.length} Recipes Loaded`}
      </div>
      <div className="lg:row-span-1">
        <RecipeDropDown recipes={recipeList} />
      </div>
    </div>
  );
}
