"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import { GET_RECIPE } from "@/graphql/queries/recipe";
import RecipeCard from "@/components/recipe/display/RecipeCard";
import SkeletonCard from "@/components/recipe/display/SkeletonCard";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useEffect } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const q = decodeURIComponent(params.slug);
  console.log(q);
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    console.log(data?.recipe);
    if (data?.recipe) {
      selectedRecipe(data.recipe);
    }
  }, [data?.recipe]);

  if (loading) {
    return (
      <div className="box-border flex h-full w-full max-w-xl flex-col items-center pb-20">
        <SkeletonCard />
      </div>
    );
  }

  if (error || !data?.recipe) {
    return <div>There is no page here</div>;
  }
  const filteredBuilds = (data.recipe.userBuild ?? []).filter(
    (build): build is Build => build !== null
  );
  console.log(filteredBuilds);
  return (
    <div className="box-border flex h-full max-w-xl flex-col items-center justify-center pb-40 pt-10">
      <RecipeCard recipe={data.recipe} />
      <BuildNavBar builds={filteredBuilds} />
    </div>
  );
}
