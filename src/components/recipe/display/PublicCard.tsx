"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useEffect, useState } from "react";

import { CardBorder } from "@/components/images/CardBorder";
import { CocktailPicture } from "@/components/images/CocktailPicture";
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
  const [builds, setBuilds] = useState<Build[]>([]);

  function mergeArrays<Build>(
    array1: (Build | null)[] | null,
    array2: (Build | null)[] | null
  ): Build[] {
    // Handle cases where either array is null
    const a1 = (array1 || []).filter((item): item is Build => item !== null);
    const a2 = (array2 || []).filter((item): item is Build => item !== null);

    // Create a new set to store unique values
    const uniqueValues = new Set<Build>([...a1, ...a2]);

    // Convert the set back to an array
    return Array.from(uniqueValues);
  }

  useEffect(() => {
    if (recipe) {
      const mergedBuilds = mergeArrays(
        recipe.publicBuild || [],
        recipe.userBuild || []
      );
      setBuilds(mergedBuilds);
    }
  }, [recipe]);

  const handleView = () => {
    selectedRecipe(recipe);
    router.push(`/recipe/${recipe.name}`);
  };

  console.log(builds);

  return (
    <div className="bg-contrast h-public-card-lg relative my-2 box-border w-full max-w-lg content-center rounded-lg text-center">
      {/* This goes on bottom */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <CardBorder />
      </div>
      {/* This goes on top */}
      <div className="relative z-10 h-full p-8">
        <div className="p-2 text-center text-xl">{recipe.name}</div>
        <div className="block">
          <div className="float-left mr-2 w-32">
            <CocktailPicture
              url={builds[0]?.image ? builds[0].image : "/withcherry100.png"}
            />{" "}
          </div>
          <div className="mt-4">{recipe.about}</div>
        </div>

        <button
          className="col-span-4 row-span-2 mt-auto py-2 text-sm"
          onClick={handleView}
        >
          <div>Explore Recipe</div>
          <div>
            {builds.length} Build
            {!!builds && builds.length > 1 ? "s " : " "}
            Available
          </div>
        </button>
      </div>
    </div>
  );
}
