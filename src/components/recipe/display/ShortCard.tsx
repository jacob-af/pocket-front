"use client";

import {} from "@/components/images/Images";

import {
  BLCorner,
  BRCorner,
  TLCorner,
  TRCorner
} from "@/components/images/ShortBorder";

import { BreakPoint } from "@/components/images/CardBorder";
import { Build } from "@/__generated__/graphql";
import { SmallCocktailPicture } from "@/components/images/CocktailPicture";
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
    <div className="bg-contrast relative my-2 w-full rounded-lg text-center">
      <div className="absolute left-0 top-0">
        <TLCorner />
      </div>
      <div className="absolute right-0 top-0">
        <TRCorner />
      </div>
      <div className="absolute bottom-0 left-0">
        <BLCorner />
      </div>
      <div className="absolute bottom-0 right-0">
        <BRCorner />
      </div>

      <div className="px-4">
        <div className="grid grid-cols-5 items-center">
          <div className="col-span-5 row-span-1 pb-4 text-3xl">
            {build.recipe.name}
          </div>

          <div className="col-span-2 row-span-3 flex w-24 justify-center">
            <SmallCocktailPicture url={build.image ?? "/withcherry100.png"} />
          </div>

          {build.touch &&
            build.touch.map((touch, index) => (
              <div
                key={touch?.id}
                className="col-span-3 row-span-1 overflow-clip pl-2 text-left text-lg md:text-base"
              >
                {touch?.amount} {touch?.unit?.abbreviation}{" "}
                {touch?.ingredient?.name}
              </div>
            ))}
          <div className="col-span-5 row-span-2 py-2 text-center">
            {build.buildName} Build
          </div>
        </div>
        <div className="flex items-center justify-center">
          <BreakPoint />
        </div>
        <div
          className="mt-auto flex items-center justify-center"
          onClick={handleOpen}
        >
          <div className="flex items-center justify-center">
            {open ? "close" : "details"}
          </div>
        </div>
        <div
          className={`grid grid-cols-4 gap-1 px-1 pb-10 items-center ${
            open ? "" : "hidden"
          }`}
        >
          <div className="col-span-4 grid items-center justify-center">
            <BreakPoint />
          </div>
          <div className="col-span-2 row-span-1 text-center">
            Ice: {build.ice}
          </div>
          <div className="col-span-2 row-span-1 text-center">
            Glassware: {build.glassware}
          </div>
          <div className="col-span-4 row-span-1 text-justify">
            <br /> Instructions: {build.instructions}
          </div>

          <button
            className="text absolute bottom-0 left-0 right-0 items-center justify-center text-center text-lg"
            onClick={handleView}
          >
            <div>See All Details</div>
          </button>
        </div>
      </div>
    </div>
  );
}
