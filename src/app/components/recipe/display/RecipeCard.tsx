"use client";

import BuildDisplay from "./BuildDisplay";
import { Recipe } from "@/__generated__/graphql";
import TempImage from "@/app/components/images/Images";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeCard() {
  const recipe = useReactiveVar(selectedRecipe);
  return (
    <div className={`p-4 border mt-16 ${recipe.name ? "" : "hidden"}`}>
      <div className="text-center text-xl">{recipe.name}</div>
      <div className="block">
        <TempImage />

        <div className="mt-4">About: {recipe.about}</div>
      </div>
      <BuildDisplay builds={recipe.userBuild} />
    </div>
  );
}
