"use client";

import {
  currentRecipe,
  selectedRecipe,
  userRecipeList
} from "@/graphql/reactiveVar/recipes";
import { useQuery, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import { PUBLIC_RECIPE } from "@/graphql/queries/recipe";
import RecipeCard from "@/components/recipe/display/RecipeCard";
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const recipeIndex = useReactiveVar(currentRecipe);
  const q =
    params.slug.charAt(0).toUpperCase() +
    params.slug.slice(1).replace(/%20/g, " ");
  const { data, loading, error } = useQuery(PUBLIC_RECIPE, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    console.log(data?.publicRecipe);
    if (data?.publicRecipe) {
      selectedRecipe(data.publicRecipe);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data?.publicRecipe) {
    console.log(data?.publicRecipe);
    return <div>There is no page here</div>;
  }
  const filteredBuilds = (data.publicRecipe.publicBuild ?? []).filter(
    (build): build is Build => build !== null
  );
  return (
    <div className="box-border flex h-screen max-w-xl flex-col items-center justify-center py-20">
      <RecipeCard recipe={data.publicRecipe} />
      {filteredBuilds.length > 0 && <BuildNavBar builds={filteredBuilds} />}
    </div>
  );
}
