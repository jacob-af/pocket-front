"use client";

import { useEffect, useMemo } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { Recipe } from "@/__generated__/graphql";
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
  // Memoized recipes array
  // const recipes = useMemo(() => {
  //   if (!data?.usersBuilds) {
  //     return [];
  //   }
  //   const recipes: Recipe[] = [];
  //   data.usersBuilds.forEach(userBuild => {
  //     const { recipe } = userBuild;
  //     const index = recipes.findIndex(rec => rec.name === recipe.name);
  //     if (index === -1) {
  //       recipes.push({
  //         ...recipe,
  //         build: [userBuild]
  //       });
  //     } else {
  //       recipes[index] = {
  //         ...recipes[index],
  //         build: [...recipes[index].build, { ...userBuild }]
  //       };
  //     }
  //   });

  //   recipes.sort((a, b) => a.name.localeCompare(b.name));
  //   return recipes;
  // }, [data?.usersBuilds]);

  useEffect(() => {
    if (!data?.usersBuilds) {
      refetch();
    }
    const recipes: Recipe[] = [];
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

    recipes.sort((a, b) => a.name.localeCompare(b.name));
    userRecipeList(recipes);
  }, [data?.usersBuilds, refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{`${recipeList.length} Recipes Loaded`}</div>;
}
