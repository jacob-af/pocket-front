"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import Link from "next/link";
import ShortCard from "./components/ShortCard";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function Recipe() {
  const recipeList = useReactiveVar(userRecipeList);
  const firstColumn = recipeList
    .filter((_, index) => index % 2 === 0)
    .flatMap(recipe => recipe.userBuild);
  const secondColumn = recipeList
    .filter((_, index) => index % 2 === 1)
    .flatMap(recipe => recipe.userBuild);

  return (
    <div className="h-full w-full grid md:grid-cols-2 gap-4 overflow-auto pt-4 m-0 box-border">
      <div className="grid col-span-1 justify-items-center w-full">
        {firstColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
      <div className="grid col-span-1 justify-items-center w-full">
        {secondColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
}
