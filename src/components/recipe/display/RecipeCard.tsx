"use client";

import BuildDisplay from "./BuildDisplay";
import { Recipe } from "@/__generated__/graphql";
import TempImage from "@/components/images/Images";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeCard() {
  const recipe = useReactiveVar(selectedRecipe);
  return (
    <>
      <div className="max-w-2xl overflow-scroll p-4">
        <div className="text-center text-xl">{recipe.name}</div>
        <div className="block">
          <TempImage />

          <div className="mt-4">About: {recipe.about}</div>
        </div>
        <BuildDisplay builds={recipe.userBuild} />
      </div>
    </>
  );
}
