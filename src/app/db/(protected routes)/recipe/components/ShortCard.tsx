"use client";

import { Build, Touch } from "@/__generated__/graphql";

import { SmallImage } from "./Images";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function ShortCard({ build }: { build: Build }) {
  return (
    <div className="border-2 border-black rounded-lg content-center text-center w-full my-2 bg-black">
      <div className="grid grid-cols-3 gap-1 items-center">
        {/* SmallImage spans 1 row and 1 column */}
        <div className="col-span-3 row-span-2">{build.recipe.name}</div>

        <div className="col-span-1 row-span-6 flex justify-center">
          <SmallImage />
        </div>

        {build.touch.map((touch, index) => (
          <div
            key={touch?.id}
            className="col-span-2 row-span-2 text-xs overflow-clip text-left"
          >
            {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
          </div>
        ))}
        <div className="col-span-3 row-span-2 text-sm">
          Build: {build.buildName}
        </div>
      </div>
    </div>
  );
}
