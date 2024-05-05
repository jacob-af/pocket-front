"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { NetworkStatus, useQuery, useReactiveVar } from "@apollo/client";

import RecipeDropDown from "./RecipeDropDown";
import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function RecipeLoader() {
  const { status: sessionStatus } = useSession();
  const { data, loading, error, refetch } = useQuery(USER_BUILDS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });
  const recipeList = useReactiveVar(userRecipeList);
  console.log(recipeList.slice(0, 2));

  useEffect(() => {
    if (data?.usersBuilds) {
      const recipes = convertRecipes(data.usersBuilds);
      console.log("sorted", recipes.slice(0, 2));
      userRecipeList(recipes);
    }
  }, [data?.usersBuilds]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {loading ? "Loading" : ""}
      {`${recipeList.length} Recipes Loaded`}
      <RecipeDropDown recipes={recipeList} />
    </div>
  );
}

function convertRecipes(usersBuilds: Build[]) {
  const recipes: Recipe[] = [];
  usersBuilds.forEach(userBuild => {
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
}
