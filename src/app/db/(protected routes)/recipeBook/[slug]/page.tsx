"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import { BookNavBar } from "@/components/recipeBook/display/BookActionBar";
import { GET_RECIPE_BOOK } from "@/graphql/queries/recipeBook";
import ShortCard from "@/components/recipe/display/ShortCard";
import { SkeletonCover } from "@/components/recipeBook/display/SkeletonCover";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useEffect } from "react";

export default function RecipeBook({ params }: { params: { slug: string } }) {
  const q = decodeURIComponent(params.slug);
  console.log(q);
  const { data, loading, error } = useQuery(GET_RECIPE_BOOK, {
    variables: { name: q },
    fetchPolicy: "cache-and-network"
  });

  const book = useReactiveVar(selectedRecipeBook);

  useEffect(() => {
    console.log(data?.book);
    if (!loading && data?.book) {
      selectedRecipeBook(data.book);
    }
  }, [data?.book, loading]);

  if (error) {
    console.log(error);
    return (
      <div className="fixed left-1/2 top-1/2 flex">There is no page here</div>
    );
  }
  // if (!data?.book?.userBuild) {
  //   console.log(error);
  //   return <div className="fixed left-1/2 top-1/2 flex">Loading....</div>;
  // }

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <div className="bg-contrast box-border flex h-screen w-full max-w-4xl flex-col items-center justify-center">
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
              {book.allBuild &&
                book.allBuild
                  .filter((_, i) => i % num === columnIndex)
                  .map(build => <ShortCard key={build.id} build={build} />)}
              {loading && <SkeletonCover />}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
