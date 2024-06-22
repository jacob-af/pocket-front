"use client";

import { useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import CostDisplay from "@/components/recipe/display/CostDisplay";
import { GET_ONE_BUILD } from "@/graphql/queries/recipe";
import RecipeCard from "@/components/recipe/display/RecipeCard";
import SkeletonCard from "@/components/recipe/display/SkeletonCard";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";

export default function Page({
  params: { slug, build }
}: {
  params: { slug: string; build: string };
}) {
  const q = decodeURIComponent(slug);
  const b = decodeURIComponent(build);
  const { data, loading, error } = useQuery(GET_ONE_BUILD, {
    variables: { recipeName: q, buildName: b },
    fetchPolicy: "cache-and-network"
  });

  const recipe = useReactiveVar(selectedRecipe);
  const [buildId, setBuildId] = useState<string>("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching data: ", error);
      // Handle error (e.g., display message or fallback UI)
    }
    console.log(data);
    if (!loading && data?.findOneBuild) {
      const buildData = data.findOneBuild;
      console.log(buildData);
      setBuildId(buildData.id);
      const rec = {
        ...buildData.recipe,
        userBuild: [buildData]
      };
      selectedRecipe(rec);
    }
  }, [data?.findOneBuild, data, loading, error]);

  if (error || !recipe.userBuild) {
    return <div>There is no page here</div>;
  }
  const filteredBuilds = (recipe.userBuild ?? []).filter(
    (build): build is Build => build !== null
  );

  return (
    <div className="box-border flex h-full max-w-xl flex-col items-center justify-center pb-40">
      <RecipeCard recipe={recipe} />
      <CostDisplay buildId={buildId} />
      <BuildNavBar builds={filteredBuilds} />
    </div>
  );
}
