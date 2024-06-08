"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import RecipeDropDown from "./RecipeDropDown";
import { USER_RECIPE_LIST } from "@/graphql/queries/recipe";
import { useEffect } from "react";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export default function RecipeLoader() {
  const { data, error, loading } = useQuery(USER_RECIPE_LIST, {
    fetchPolicy: "cache-and-network"
  });
  const recipeList = useReactiveVar(userRecipeList);

  useEffect(() => {
    if (data?.userRecipeList) {
      const recipes = data?.userRecipeList
        .filter(recipe => {
          return recipe.userBuild && recipe.userBuild.length > 0;
        })
        .map((recipe: Recipe) => {
          return {
            ...recipe,
            build: recipe.userBuild
          };
        });
      userRecipeList(recipes);
    }
  }, [data?.userRecipeList]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex w-72">
      <RecipeDropDown
        recipes={recipeList}
        loading={
          recipeList.length === 0 && loading
            ? "Loading..."
            : recipeList.length > 0 && loading
            ? `Updating...`
            : `Recipe Search`
        }
      />
    </div>
  );
}
