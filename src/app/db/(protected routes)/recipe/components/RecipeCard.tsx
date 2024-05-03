"use client";

import { Transition } from "@headlessui/react";
import { Build, Recipe, Touch } from "@/__generated__/graphql";
import TempImage from "./TempImage";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import BuildDisplay from "./BuildDisplay";

export default function RecipeCard() {
  const recipe = useReactiveVar(selectedRecipe);
  return (
    <div className={`p-4 border mt-16 ${recipe.name ? "" : "hidden"}`}>
      {/* <Transition
        show="true"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0" 
      >*/}
      <div className="text-center text-xl">{recipe.name}</div>
      <div className="block">
        <TempImage />

        <div className="mt-4">About: {recipe.about}</div>
      </div>
      <BuildDisplay builds={recipe.build} />
    </div>
  );
}
