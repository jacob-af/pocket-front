"use client";

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

export default function BuildSkeleton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
          <div className="col-span-5 row-span-1 flex justify-center pb-4 text-3xl">
            <div className="mb-2 h-10 w-32 animate-pulse bg-gray-300"></div>
          </div>

          <div className="col-span-2 row-span-3 flex w-24 justify-center">
            <div className="mb-4 h-24 w-24 animate-pulse bg-gray-300"></div>
          </div>
          <div className="col-span-3 row-span-1 overflow-clip pl-2 text-left text-lg md:text-base">
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          </div>
          <div className="col-span-3 row-span-1 overflow-clip pl-2 text-left text-lg md:text-base">
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          </div>
          <div className="col-span-3 row-span-1 overflow-clip pl-2 text-left text-lg md:text-base">
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          </div>

          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="col-span-5 row-span-2 flex justify-center">
            <div className="mb-2 h-6 w-40 animate-pulse bg-gray-300"></div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <BreakPoint />
          <div className="mb-2 h-6 w-20 animate-pulse bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
