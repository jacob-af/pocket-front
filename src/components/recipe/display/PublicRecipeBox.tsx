"use client";

import {
  ApolloQueryResult,
  useLazyQuery,
  useReactiveVar
} from "@apollo/client";
import { PUBLIC_RECIPES, USER_RECIPES } from "@/graphql/queries/recipe";
import { useCallback, useEffect, useMemo, useState } from "react";

import PublicCard from "@/components/recipe/display/PublicCard";
import { Recipe } from "@/__generated__/graphql";
import SkeletonCard from "./SkeletonCard";
import { useLazyLoad } from "@/hooks/useLazyLoad";

export function PublicRecipeBox() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeSet, setRecipeSet] = useState<Set<string>>(new Set());
  const [recipeList, setList] = useState<Recipe[]>([]);
  const itemsPerPage = 12;

  const [getData, { loading, error }] = useLazyQuery(PUBLIC_RECIPES, {
    onCompleted: response => {
      const newRecipes = response.publicRecipes.filter(
        recipe => !recipeSet.has(recipe.id)
      );
      if (newRecipes.length > 0) {
        setRecipeSet(
          prevSet =>
            new Set([
              ...Array.from(prevSet),
              ...newRecipes.map(recipe => recipe.id)
            ])
        );
        setList(value => [...value, ...newRecipes]);
        setHasMore(newRecipes.length === itemsPerPage);
      } else {
        setHasMore(false);
      }
    },
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    getData({
      variables: { skip: currentPage * itemsPerPage, take: itemsPerPage },
      fetchPolicy: "cache-and-network"
    });
  }, [currentPage, getData]);

  const [observerRef] = useLazyLoad(() => {
    if (hasMore && !loading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  });

  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <>
      {columnConfigurations.map((columns, index) =>
        // Create a div for each column configuration
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
      {/* Add a div to observe for lazy loading */}
      <div
        ref={observerRef as React.RefObject<HTMLDivElement>}
        style={{ height: "20px", background: "transparent" }}
      />
    </>
  );
}
