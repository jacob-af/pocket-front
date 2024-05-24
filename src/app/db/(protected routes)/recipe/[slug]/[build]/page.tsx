"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import { GET_ONE_BUILD } from "@/graphql/queries/recipe";
import RecipeCard from "@/components/recipe/display/RecipeCard";
import SkeletonCard from "@/components/recipe/display/SkeletonCard";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useEffect } from "react";

export default function Page({
  params: { slug, build }
}: {
  params: { slug: string; build: string };
}) {
  const q = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/%20/g, " ");
  const b = build.charAt(0).toUpperCase() + build.slice(1).replace(/%20/g, " ");
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

  if (loading) {
    return (
      <div className="mb-24 box-border flex h-full flex-col items-center justify-center overflow-scroll lg:mt-36">
        <SkeletonCard />
      </div>
    );
  }

  if (error || !recipe.userBuild) {
    return <div>There is no page here</div>;
  }
  const filteredBuilds = (recipe.userBuild ?? []).filter(
    (build): build is Build => build !== null
  );

  return (
    <div className="box-border flex h-screen max-w-xl flex-col items-center justify-center py-20">
      <RecipeCard recipe={recipe} />
      <BuildNavBar builds={filteredBuilds} />
    </div>
  );
}
