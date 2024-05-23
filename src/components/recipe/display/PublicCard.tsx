"use client";

import {} from "@/components/images/Images";

import { Build, Recipe, Touch } from "@/__generated__/graphql";
import { currentRecipe, selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { redirect, useRouter } from "next/navigation";

import TempImage from "@/components/images/Images";

export default function PublicCard({
  recipe,
  index
}: {
  recipe: Recipe;
  index: number;
}) {
  const router = useRouter();
  const handleView = () => {
    selectedRecipe(recipe);
    currentRecipe(index);
    router.push(`/recipe/${recipe.name}`);
  };

  return (
    <div className="relative my-2 w-full content-center rounded-lg bg-black text-center">
      <div className="p-2 text-center text-xl">{recipe.name}</div>
      <div className="block">
        <TempImage />

        <div className="mt-4">About: {recipe.about}</div>
      </div>

      <button
        className="col-span-4 row-span-2 py-2 text-sm"
        onClick={handleView}
      >
        <div>Explore Recipe</div>
        <div>
          {recipe.publicBuild?.length} Build
          {!!recipe.publicBuild && recipe.publicBuild?.length > 1 ? "s " : " "}
          Available
        </div>
      </button>
    </div>
  );
}
