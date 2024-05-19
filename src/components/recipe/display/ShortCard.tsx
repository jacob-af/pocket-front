"use client";

import {} from "../../images/Images";

import { Build, Touch } from "@/__generated__/graphql";
import {
  DownArrow,
  Expand,
  SmallImage,
  UpArrow
} from "@/components/images/Images";

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
    <div className="relative my-2 w-full content-center rounded-lg bg-black text-center">
      <div className="absolute right-2 mt-2" onClick={handleOpen}>
        {open ? <UpArrow /> : <DownArrow />}
      </div>

      <div className="grid grid-cols-4 items-center gap-1">
        <div className="col-span-4 row-span-2">{build.recipe.name}</div>

        <div className="col-span-2 row-span-5 flex justify-center pl-2">
          <SmallImage />
        </div>

        {build.touch &&
          build.touch.map((touch, index) => (
            <div
              key={touch?.id}
              className="col-span-2 row-span-1 overflow-clip pl-2 text-left text-xs"
            >
              {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
            </div>
          ))}
        <div className="col-span-4 row-span-2 py-2 text-sm">
          Build: {build.buildName}
        </div>
      </div>
      <div
        className={`grid grid-cols-4 gap-1 pb-4 px-1 items-center ${
          open ? "" : "hidden"
        }`}
      >
        <div className="col-span-2 row-span-1 text-left text-sm">
          Ice: {build.ice}
        </div>
        <div className="col-span-2 row-span-1 text-left text-sm">
          Glassware: {build.glassware}
        </div>
        <div className="col-span-4 row-span-1 text-left text-sm">
          <br /> Instructions: {build.instructions}
        </div>

        <div className="absolute bottom-1 right-2 text-xs" onClick={handleView}>
          <Expand />
        </div>
      </div>
    </div>
  );
}
