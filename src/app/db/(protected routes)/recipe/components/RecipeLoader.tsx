"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useEffect, useMemo } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { useSession } from "next-auth/react";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function RecipeLoader() {
  const { status: sessionStatus } = useSession();
  const { data, loading, error, refetch } = useQuery(USER_BUILDS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });
  const recipeList = useReactiveVar(userRecipeList);

  useEffect(() => {
    if (!loading) {
      const recipes = convertRecipes(data);
      recipes.sort((a, b) => a.name.localeCompare(b.name));
      userRecipeList(recipes);
    }
  }, [data, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{`${recipeList.length} Recipes Loaded`}</div>;
}

function convertRecipes(
  data:
    | {
        usersBuilds: Build[];
      }
    | undefined
) {
  const recipes: Recipe[] = [];
  if (data && data.usersBuilds) {
    data?.usersBuilds.forEach(userBuild => {
      const { recipe } = userBuild;
      const index = recipes.findIndex(rec => rec.name === recipe.name);
      if (index === -1) {
        recipes.push({
          ...recipe,
          build: [userBuild]
        });
      } else {
        recipes[index] = {
          ...recipes[index],
          build: [...recipes[index].build, { ...userBuild }]
        };
      }
    });
  }
  return recipes;
}
