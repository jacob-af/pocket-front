"use client";

import { Recipe } from "@/__generated__/graphql";
import ShortBuildDisplay from "./ShortBuildDisplay";
import { SmallImage } from "./TempImage";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function ShortCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className={"p-1 border"}>
      <div className="text-center text-xl">{recipe.name}</div>
      <div className="block">
        <SmallImage />
      </div>
      <ShortBuildDisplay builds={recipe.userBuild} />
    </div>
  );
}
