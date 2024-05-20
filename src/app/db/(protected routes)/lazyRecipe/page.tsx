"use client";

import { useEffect, useState } from "react";
import { useLazyQuery, useReactiveVar } from "@apollo/client";

import AddRecipe from "@/components/buttons/AddRecipeButton";
import { LAZY_RECIPES } from "@/graphql/queries/recipe";
import { Recipe } from "@/__generated__/graphql";
import RecipeLoader from "@/components/recipe/RecipeLoader";
import ShortCard from "@/components/recipe/display/ShortCard";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export default function RecipePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [data, setData] = useState<Recipe[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [uniqueItems, setUniqueItems] = useState(new Set());

  const [getData, { loading, error }] = useLazyQuery(LAZY_RECIPES, {
    onCompleted: response => {
      const newItems = response.recipes.filter(
        (item: Recipe) => !uniqueItems.has(item.id)
      );
      setData(prevData => [...prevData, ...newItems]);
      newItems.forEach((item: Recipe) => uniqueItems.add(item.id));
      setHasMore(response.recipes.length === itemsPerPage);
    }
  });

  useEffect(() => {
    getData({
      variables: {
        skip: 0,
        take: itemsPerPage
      }
    });
  }, [getData, itemsPerPage]);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        if (
          window.innerHeight + scrollTop >=
          document.documentElement.offsetHeight
        ) {
          if (hasMore) {
            getData({
              variables: {
                skip: currentPage * itemsPerPage,
                take: itemsPerPage
              }
            });
            setCurrentPage(prevPage => prevPage + 1);
          }
        }
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, getData, currentPage, itemsPerPage]);

  // Define the configurations for the number of columns
  const columnConfigurations = [[1], [2, 2], [3, 3, 3]];

  return (
    <>
      <div className="bg-background mt-12 flex w-full max-w-2xl items-center justify-center">
        <RecipeLoader />
      </div>
      <div className="mt-10 box-border grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* AddRecipe button */}
        <div className="fixed right-2 top-12 z-40">
          <AddRecipe />
        </div>

        {/* Map over the configurations for column sizes */}
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
              {data
                .flatMap(recipe => recipe.userBuild)
                .filter((_, i) => i % num === columnIndex)
                .map(build => (
                  <ShortCard key={build.id} build={build} />
                ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}
