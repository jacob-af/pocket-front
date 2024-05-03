"use client";

import { useQuery, useReactiveVar } from "@apollo/client";
import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { Recipe } from "@/__generated__/graphql";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

export default function RecipeLoader() {
  const { status: sessionStatus } = useSession();
  const userRecipes = useReactiveVar(userRecipeList);
  const { data, loading, error } = useQuery(USER_BUILDS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    const recipes: Recipe[] = [];
    if (data && data.usersBuilds) {
      data.usersBuilds.forEach(userBuild => {
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

      recipes.sort((a, b) => a.name.localeCompare(b.name));
    }
    userRecipeList(recipes);
  }, [data]);

  // Memoized recipes array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <>{userRecipes.length} Recipes</>;
}
