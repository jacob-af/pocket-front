"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import { GET_RECIPE } from "@/graphql/queries/recipe";
import RecipeCard from "@/components/recipe/display/RecipeCard";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const q =
    params.slug.charAt(0).toUpperCase() +
    params.slug.slice(1).replace(/%20/g, " ");
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });
  const recipe = useReactiveVar(selectedRecipe);

  useEffect(() => {
    if (data?.recipe) {
      console.log(data?.recipe);
      selectedRecipe(data.recipe);
    }
  }, [data?.recipe]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There is no page here</div>;
  }

  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <RecipeCard />
      <BuildNavBar />
    </div>
  );
}
