"use client";

import {} from "@/components/images/Images";

import { Build, Recipe, Touch } from "@/__generated__/graphql";
import { useEffect, useState } from "react";

import { CardBorder } from "@/components/images/CardBorder";
import { CocktailPicture } from "@/components/images/CocktailPicture";
import TempImage from "@/components/images/Images";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useRouter } from "next/navigation";

export default function PublicCard({
  recipe,
  index
}: {
  recipe: Recipe;
  index: number;
}) {
  const router = useRouter();
  const [url, setUrl] = useState("/withCherry100.png");

  useEffect(() => {
    // Update the URL state when the current build index or builds change
    const build = recipe.publicBuild?.[0];
    const imageUrl = build?.image ?? "/withCherry100.png";
    setUrl(imageUrl);
  }, [recipe]);

  const handleView = () => {
    selectedRecipe(recipe);
    router.push(`/recipe/${recipe.name}`);
  };

  return (
    <div className="bg-contrast relative my-2 h-96 w-full content-center rounded-lg text-center">
      {/* THis goes on bottom */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <CardBorder />
      </div>
      {/* This goes on top */}
      <div className="relative z-10 p-8">
        <div className="p-2 text-center text-xl">{recipe.name}</div>
        <div className="block">
          <div className="float-left mr-2 w-32 lg:w-auto">
            <CocktailPicture url={url} />{" "}
          </div>
          <div className="mt-4 text-xs sm:text-sm md:text-base">
            {recipe.about}
          </div>
        </div>

        <button
          className="col-span-4 row-span-2 mt-auto py-2 text-sm"
          onClick={handleView}
        >
          <div>Explore Recipe</div>
          <div>
            {recipe.publicBuild?.length} Build
            {!!recipe.publicBuild && recipe.publicBuild?.length > 1
              ? "s "
              : " "}
            Available
          </div>
        </button>
      </div>
    </div>
  );
}
