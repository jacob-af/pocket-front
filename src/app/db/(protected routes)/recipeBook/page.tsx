"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import AddRecipe from "../../../components/buttons/AddRecipeButton";
import { Build } from "@/__generated__/graphql";
import ShortCard from "../../../components/recipe/display/ShortCard";
import { selectedRecipeBook } from "@/app/graphql/reactiveVar/recipeBooks";

export default function RecipeBook() {
  const recipeBook = useReactiveVar(selectedRecipeBook);
  const buildList: Build[] = recipeBook.build || [];

  const firstDuoColumn = buildList.filter((_, index) => index % 2 === 0);
  const secondDuoColumn = buildList.filter((_, index) => index % 2 === 1);

  const firstTrioColumn = buildList.filter((_, index) => index % 3 === 0);
  const secondTrioColumn = buildList.filter((_, index) => index % 3 === 1);
  const thirdTrioColumn = buildList.filter((_, index) => index % 3 === 2);

  return (
    <div className="h-full w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-auto pt-4 m-0 box-border">
      <div className="fixed top-12 right-2 z-40"></div>
      {/* Single Column */}
      <div className="grid md:hidden col-span-1 justify-items-center w-full">
        {buildList.map(build => (
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
