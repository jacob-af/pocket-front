"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_RECIPE } from "@/app/graphql/queries/recipe";
import RecipeCard from "./RecipeCard";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const q = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
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
    <div>
      My Post: {recipe.name}
      <RecipeCard recipe={recipe} />
    </div>
  );
}
