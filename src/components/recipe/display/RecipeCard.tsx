"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { useEffect, useRef, useState } from "react";

import BuildDisplay from "./BuildDisplay";
import { CocktailPicture } from "@/components/images/CocktailPicture";
import { currentBuild } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const current = useReactiveVar(currentBuild);
  const [url, setUrl] = useState("/withCherry100.png");
  const buildsRef = useRef<Build[]>([]);

  const [builds, setBuilds] = useState<Build[]>([]);

  useEffect(() => {
    // Update builds whenever the recipe changes
    const updatedBuilds = [
      ...(recipe.publicBuild?.filter((build): build is Build => !!build) || []),
      ...(recipe.userBuild?.filter((build): build is Build => !!build) || [])
    ];
    setBuilds(updatedBuilds);
  }, [recipe]);

  useEffect(() => {
    // Update the URL state when the current build index or builds change
    const currentBuild = builds[current];
    const imageUrl = currentBuild?.image ?? "/withCherry100.png";
    setUrl(imageUrl);
  }, [current, builds]);

  return (
    <div className="max-w-2xl overflow-scroll">
      <div className="text-center text-xl">{recipe.name}</div>
      <div className="block">
        <div className="float-left mr-2">
          <CocktailPicture url={url} />{" "}
          {/* Use state for URL to trigger re-renders on change */}
        </div>
        <div className="mt-4">{recipe.about}</div>
      </div>
      <br />
      <BuildDisplay builds={builds} />
    </div>
  );
}
