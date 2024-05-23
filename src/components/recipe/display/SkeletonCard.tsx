import React from "react";

export default function RecipeCardSkeleton() {
  return (
    <div className="max-w-2xl overflow-scroll p-4">
      <div className="mb-4 h-8 animate-pulse bg-gray-300 text-center text-xl"></div>
      <div className="block">
        <div className="mb-4 h-48 w-full animate-pulse bg-gray-300"></div>
        <div className="mb-2 mt-4 h-6 animate-pulse bg-gray-300"></div>
      </div>
      <div className="carousel">
        <div className="carousel-slide">
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
          <div className="mb-2 h-6 animate-pulse bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-10 w-20 animate-pulse bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
