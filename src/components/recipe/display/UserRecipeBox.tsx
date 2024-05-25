"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import { Recipe } from "@/__generated__/graphql";
import ShortCard from "@/components/recipe/display/ShortCard";
import { USER_RECIPES } from "@/graphql/queries/recipe";

export function RecipeBox() {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [recipeList, setList] = useState<Recipe[]>([]);
  const itemsPerPage = 12;
  const scrollOffset = 200;

  const [getData, { loading, error }] = useLazyQuery(USER_RECIPES, {
    onCompleted: response => {
      console.log(response);
      const newRecipes = response.userRecipes;
      console.log(newRecipes);
      if (newRecipes.length > 0) {
        setList(value => [...value, ...newRecipes]);
        setHasMore(newRecipes.length === itemsPerPage);
      }
    }
  });

  useEffect(() => {
    console.log("Fetching initial data");
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  }, [getData]); // Include getData to comply with linting rules

  type CallbackFunction = () => void;

  const handleScroll = useMemo(() => {
    const debounce = (
      func: CallbackFunction,
      wait: number
    ): CallbackFunction => {
      let timeout: NodeJS.Timeout;
      return function executedFunction() {
        const later = () => {
          clearTimeout(timeout);
          func();
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
    return debounce(() => {
      const scrollTop = document.documentElement.scrollTop;
      if (
        window.innerHeight + scrollTop + scrollOffset >=
          document.documentElement.offsetHeight &&
        hasMore
      ) {
        console.log("Fetching more data");
        getData({
          variables: {
            skip: currentPage * itemsPerPage,
            take: itemsPerPage
          }
        });
        setCurrentPage((prevPage: number) => prevPage + 1);
      }
    }, 100);
  }, [hasMore, getData, currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <div className="mt-10 box-border grid h-full w-full grid-flow-col grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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
            {/* Calculate the starting index for this column's builds */}
            {recipeList
              .flatMap(recipe => recipe.userBuild)
              .filter((build, i) => build && i % num === columnIndex) // Ensure build is not null or undefined
              .map(
                (build, index) =>
                  build && <ShortCard key={build.id + index} build={build} />
              )}
          </div>
        ))
      )}
    </div>
  );
}
