"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_ONE_BUILD } from "@/app/graphql/queries/recipe";
import RecipeCard from "../RecipeCard";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useEffect } from "react";

export default function Page({
  params: { slug, build }
}: {
  params: { slug: string; build: string };
}) {
  const q = slug.charAt(0).toUpperCase() + slug.slice(1);
  // .replace(/%20/g, " ");
  const b = build.charAt(0).toUpperCase() + build.slice(1);
  // .replace(/%20/g, " ");
  const { data, loading, error } = useQuery(GET_ONE_BUILD, {
    variables: { recipeName: q, buildName: b },
    fetchPolicy: "cache-and-network"
  });

  const recipe = useReactiveVar(selectedRecipe);

  useEffect(() => {
    if (error) {
      console.error("Error fetching data: ", error);
      // Handle error (e.g., display message or fallback UI)
    }
    console.log(data);
    if (!loading && data?.findOneBuild) {
      const buildData = data.findOneBuild;
      console.log(buildData);
      const rec = {
        ...buildData.recipe,
        userBuild: [buildData]
      };
      selectedRecipe(rec);
    }
  }, [data?.findOneBuild, data, loading, error]);

  return (
    <div>
      {recipe.name}
      <RecipeCard recipe={recipe} />
    </div>
  );
}
