"use client";

import { Build, Touch } from "@/__generated__/graphql";
import { DownArrow, Expand, UpArrow } from "../../images/Images";

import { SmallImage } from "../../images/Images";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ShortCard({ build }: { build: Build }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleView = () => {
    console.log(build.recipe.name, build.buildName);
    router.push(`/db/recipe/${build.recipe.name}/${build.buildName}`);
  };

  return (
    <div className="relative rounded-lg content-center text-center w-full my-2 bg-black z-10">
      <div className="absolute mt-2 right-2" onClick={handleOpen}>
        {open ? <UpArrow /> : <DownArrow />}
      </div>

      <div className="grid grid-cols-4 gap-1 items-center">
        <div className="col-span-4 row-span-2">{build.recipe.name}</div>

        <div className="col-span-2 row-span-5 flex justify-center pl-2">
          <SmallImage />
        </div>

        {build.touch.map((touch, index) => (
          <div
            key={touch?.id}
            className="col-span-2 row-span-1 text-xs overflow-clip text-left pl-2"
          >
            {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
          </div>
        ))}
        <div className="col-span-4 row-span-2 text-sm">
          Build: {build.buildName}
        </div>
      </div>
      <div
        className={`grid grid-cols-4 gap-1 pb-4 px-1 items-center ${
          open ? "" : "hidden"
        }`}
      >
        <div className="col-span-2 row-span-1 text-sm text-left">
          Ice: {build.ice}
        </div>
        <div className="col-span-2 row-span-1 text-sm text-left">
          Glassware: {build.glassware}
        </div>
        <div className="col-span-4 row-span-1 text-sm text-left">
          <br /> Instructions: {build.instructions}
        </div>

        <div className="absolute bottom-1 right-2 text-xs" onClick={handleView}>
          <Expand />
        </div>
      </div>
    </div>
  );
}
