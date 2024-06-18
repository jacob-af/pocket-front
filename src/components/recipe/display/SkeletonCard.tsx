import { CardBorder } from "@/components/images/CardBorder";
import React from "react";

export default function RecipeCardSkeleton() {
  return (
    <div className="bg-contrast h-public-card-lg relative my-2 box-border w-full max-w-lg content-center rounded-lg text-center">
      {/* This goes on bottom */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <CardBorder />
      </div>
      {/* This goes on top */}
      <div className="relative z-10 h-full p-8">
        <div className="flex justify-center">
          <div className="my-4 h-10 w-52 animate-pulse bg-gray-300"></div>
        </div>

        <div className="block">
          <div className="float-left mr-2 w-32 lg:w-auto">
            <div className="mb-4 h-48 w-48 animate-pulse bg-gray-300"></div>
          </div>
          <div className="float-right w-20">
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
            <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          </div>
        </div>
        <div className="mt-52 flex flex-col items-center justify-center">
          <div className="mb-2 h-6 w-full animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 w-full animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 w-52 animate-pulse bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
