"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipe from "../../../components/buttons/AddRecipeButton";
import Link from "next/link";
import ShortCard from "../../../components/recipe/display/ShortCard";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function Recipe() {
  const recipeList = useReactiveVar(userRecipeList);
  const firstDuoColumn = recipeList
    .filter((_, index) => index % 2 === 0)
    .flatMap(recipe => recipe.userBuild);
  const secondDuoColumn = recipeList
    .filter((_, index) => index % 2 === 1)
    .flatMap(recipe => recipe.userBuild);
  const firstTrioColumn = recipeList
    .filter((_, index) => index % 3 === 0)
    .flatMap(recipe => recipe.userBuild);
  const secondTrioColumn = recipeList
    .filter((_, index) => index % 3 === 1)
    .flatMap(recipe => recipe.userBuild);
  const thirdTrioColumn = recipeList
    .filter((_, index) => index % 3 === 2)
    .flatMap(recipe => recipe.userBuild);

  return (
    <div className="h-full w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto pt-4 m-0 box-border">
      <div className="fixed top-12 right-2 z-40">
        <AddRecipe />
      </div>
      {/* Single Column */}
      <div className="grid md:hidden col-span-1 justify-items-center w-full">
        {recipeList
          .flatMap(recipe => recipe.userBuild)
          .map(build => (
            <ShortCard key={build.id} build={build} />
          ))}
      </div>
      {/* Double Column */}
      <div className="hidden md:grid xl:hidden col-span-1 justify-items-center w-full ">
        {firstDuoColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
      <div className="hidden md:grid xl:hidden col-span-1 justify-items-center w-full ">
        {secondDuoColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
      {/* Triple Column */}
      <div className="hidden xl:grid col-span-1 justify-items-center w-full ">
        {firstTrioColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
      <div className="hidden xl:grid col-span-1 justify-items-center w-full ">
        {secondTrioColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
      <div className="hidden xl:grid col-span-1 justify-items-center w-full ">
        {thirdTrioColumn.map(build => (
          <ShortCard key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
}
