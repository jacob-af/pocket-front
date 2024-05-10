"use client";

import { Build, Touch } from "@/__generated__/graphql";
import { DownArrow, UpArrow } from "./Images";

import { SmallImage } from "./Images";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export default function ShortCard({ build }: { build: Build }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="rounded-lg content-center text-center w-full my-2 bg-black">
      <div className="float-right pt-3 pr-3" onClick={handleOpen}>
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
          <div className={`${open ? "" : "hidden"}`}>
            <div className="col-span-4 row-span-2 text-sm text-left">
              Ice: {build.ice} Glassware: {build.glassware}
              <br />
              Instructions: {build.instructions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
