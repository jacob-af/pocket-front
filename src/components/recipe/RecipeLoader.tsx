"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import RecipeDropDown from "./RecipeDropDown";
import { USER_RECIPES } from "@/graphql/queries/recipe";
import { useEffect } from "react";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

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
    <div className="fixed top-14 h-16">
      <div className="flex w-72">
        <RecipeDropDown
          recipes={recipeList}
          loading={
            recipeList.length === 0 && loading
              ? "Loading..."
              : recipeList.length > 0 && loading
              ? `Updating...`
              : `${recipeList.length} Recipes Loaded`
          }
        />
      </div>
    </div>
  );
}
