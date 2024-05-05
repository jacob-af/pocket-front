"use client";
export const dynamic = "force-dynamic";

import { Build, Recipe } from "@/__generated__/graphql";
import { NetworkStatus, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect, useMemo } from "react";

import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { useSession } from "next-auth/react";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function RecipeLoader() {
  const { status: sessionStatus } = useSession();
  const { data, loading, error } = useQuery(USER_BUILDS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });

  // Memoized recipes array
  const recipes = useMemo(() => {
    if (!data?.usersBuilds) {
      return [];
    }
    const recipes: Recipe[] = [];
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
    return recipes;
  }, [data?.usersBuilds]);

  useEffect(() => {
    userRecipeList(recipes);
  }, [recipes]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return <div>{`${recipes.length} Recipes Loaded`}</div>;
}
