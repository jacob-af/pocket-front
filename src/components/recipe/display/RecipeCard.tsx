"use client";

import { Build, Recipe } from "@/__generated__/graphql";

import BuildDisplay from "./BuildDisplay";
import TempImage from "@/components/images/Images";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeCard() {
  const recipe = useReactiveVar(selectedRecipe);
  const publicBuilds = !!recipe.publicBuild
    ? recipe.publicBuild.filter((build): build is Build => !!build)
    : [];
  const userBuilds = !!recipe.userBuild
    ? recipe.userBuild.filter((build): build is Build => !!build)
    : [];

  const builds = [...publicBuilds, ...userBuilds];
  console.log(builds);
  return (
    <div className="max-w-2xl overflow-scroll p-4">
      <div className="text-center text-xl">{recipe.name}</div>
      <div className="block">
        <TempImage />

        <div className="mt-4">About: {recipe.about}</div>
      </div>
      {builds && <BuildDisplay builds={builds} />}
    </div>
  );
}
