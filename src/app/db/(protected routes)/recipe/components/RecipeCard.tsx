"use client";

import { Transition } from "@headlessui/react";
import { Build, Recipe, Touch } from "@/__generated__/graphql";
import TempImage from "./TempImage";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

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
      <ul>
        {recipe.build?.map((build: Build, index: number) => {
          return <BuildDisplay key={index} build={build} />;
        })}
      </ul>
    </div>
  );
}

const BuildDisplay: React.FC<{ build: Build }> = ({ build }) => {
  const sortedTouches = build.touch?.slice().sort((a, b) => {
    // Ensure both a and b are not null, and handle the case when `order` is null or undefined
    const orderA = a?.order ?? Number.MAX_VALUE;
    const orderB = b?.order ?? Number.MAX_VALUE;
    return orderA - orderB;
  });
  return (
    <>
      <div className="py-2">Build Name: {build.buildName}</div>
      {sortedTouches.map((touch: Touch | null, index: number) => (
        <div key={index}>
          {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
        </div>
      ))}
      <div className="py-2">Instructions: {build.instructions}</div>
      <div className="py-2">Ice: {build.ice}</div>
      <div className="py-2">Glassware: {build.glassware}</div>
    </>
  );
};
