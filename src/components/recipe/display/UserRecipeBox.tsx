"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import PublicCard from "./PublicCard";
import PullToRefresh from "@/components/SharedComponents/PullToRefresh";
import { Recipe } from "@/__generated__/graphql";
import ShortCard from "@/components/recipe/display/ShortCard";
import { Skeleton } from "@mui/material";
import SkeletonCard from "./SkeletonCard";
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
    },
    fetchPolicy: "cache-and-network"
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

  const handleRefresh = () => {
    console.log("Refreshing");
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  };

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

  const columnConfigurations = [[1], [2, 2]];

  if (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="mt-10 box-border grid h-full w-full max-w-3xl grid-flow-col grid-cols-1 gap-4 lg:grid-cols-2">
        {columnConfigurations.map((columns, index) =>
          //{/* Create a div for each column configuration */}
          columns.map((num, columnIndex) => (
            <div
              key={`${index}-${columnIndex}`}
              className={`col-span-1 justify-items-center w-full ${
                index === 0 ? "grid lg:hidden" : ""
              } ${index === 1 ? "hidden lg:grid" : ""}`}
            >
              {/* Calculate the starting index for this column's builds */}
              {recipeList
                .filter((build, i) => build && i % num === columnIndex)
                .map(
                  (recipe, index) =>
                    recipe && (
                      <PublicCard
                        key={recipe.id + index}
                        recipe={recipe}
                        index={index}
                      />
                    )
                )}
              {loading && <SkeletonCard />}
            </div>
          ))
        )}
      </div>
    </PullToRefresh>
  );
}
