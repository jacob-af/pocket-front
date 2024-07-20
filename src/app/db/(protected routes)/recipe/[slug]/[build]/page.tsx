"use client";

import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useEffect, useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import BuildCard from "@/components/recipe/display/BuildCard";
import { BuildNavBar } from "@/components/navigation/BuildNavBar";
import CostDisplay from "@/components/recipe/display/CostDisplay";
import { GET_RECIPE } from "@/graphql/queries/recipe";
import Link from "next/link";
import SkeletonCard from "@/components/recipe/display/SkeletonCard";
import { useRouter } from "next/navigation";

export default function Page({
  params: { slug, build }
}: {
  params: { slug: string; build: string };
}) {
  const q = decodeURIComponent(slug);
  const b = decodeURIComponent(build);
  const recipe = useReactiveVar(selectedRecipe);
  const slide: number = useReactiveVar(currentBuild);
  const router = useRouter();
  const [buildId, setBuildId] = useState<string>("");

  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    console.log(data?.recipe);
    if (data?.recipe) {
      selectedRecipe(data.recipe);
      const buildIndex = data.recipe?.userBuild?.findIndex(
        build => build?.buildName === b
      );
      if (buildIndex === -1) {
        router.push(`/db/recipe/${slug}`);
      } else {
        currentBuild(buildIndex);
        setBuildId(data.recipe.userBuild?.[slide]?.id ?? "");
      }
    }
  }, [data?.recipe, b, router, slug, slide]);

  if (error || !recipe.userBuild) {
    return <div>There is no page here</div>;
  }
  const filteredBuilds = (recipe.userBuild ?? []).filter(
    (build): build is Build => build !== null
  );

  return (
    <div className="box-border flex h-full max-w-xl flex-col items-center justify-center pb-40">
      <Link href={`/db/recipe/${encodeURIComponent(recipe.name)}`}>
        Go Back to Recipes
      </Link>
      <BuildCard recipe={recipe} />
      <CostDisplay buildId={buildId} />
      <BuildNavBar builds={filteredBuilds} />
    </div>
  );
}
