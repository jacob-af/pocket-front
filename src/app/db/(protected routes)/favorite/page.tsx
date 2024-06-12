"use client";

import { Build, Profile } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import { GET_PROFILE_BOOK } from "@/graphql/queries/profile";
import ShortCard from "@/components/recipe/display/ShortCard";
import { SkeletonCover } from "@/components/recipeBook/display/SkeletonCover";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useEffect } from "react";

export default function RecipeBook() {
  const book = useReactiveVar(selectedRecipeBook);

  const { data, loading, error } = useQuery(GET_PROFILE_BOOK, {
    onCompleted: (data: { getProfile: Profile }) => {
      if (data?.getProfile?.preferredBook) {
        selectedRecipeBook(data.getProfile.preferredBook);
      } else {
        console.error("Preferred book is null or undefined");
      }
    }
  });

  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="bg-contrast box-border flex h-screen w-full max-w-3xl flex-col items-center justify-center">
      <div className="m-0 mt-24 box-border grid h-full w-full grid-cols-1 gap-4 overflow-y-scroll md:grid-cols-2 xl:grid-cols-3">
        {columnConfigurations.map((columns, index) =>
          //{/* Create a div for each column configuration */}
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "grid md:hidden" : ""
              } ${index === 1 ? "hidden md:grid xl:hidden" : ""}${
                index === 2 ? "hidden xl:grid" : ""
              }`}
            >
              {book.userBuild &&
                book.userBuild
                  .filter((_, i) => i % num === columnIndex)
                  .map(build => <ShortCard key={build.id} build={build} />)}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
