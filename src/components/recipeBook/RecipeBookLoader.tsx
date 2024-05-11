"use client";

import { Build, RecipeBook } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import RecipeBookDropDown from "./RecipeBookDropDown";
import { USER_RECIPEBOOKS } from "@/graphql/queries/recipeBook";
import { useEffect } from "react";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export default function RecipeBookLoader() {
  const { data, error, loading } = useQuery(USER_RECIPEBOOKS, {
    fetchPolicy: "cache-and-network"
  });
  const recipeBookList = useReactiveVar(userRecipeBookList);

  useEffect(() => {
    if (data?.userRecipeBooks) {
      userRecipeBookList(data.userRecipeBooks);
    }
  }, [data?.userRecipeBooks]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
      <div className="lg:row-span-1 flex items-center justify-center">
        {recipeBookList.length === 0 && loading
          ? "Loading..."
          : recipeBookList.length > 0 && loading
          ? `${recipeBookList.length} Recipes Loaded From Cache`
          : `${recipeBookList.length} Recipe Books Loaded`}
      </div>
      <div className="lg:row-span-1">
        <RecipeBookDropDown recipeBooks={recipeBookList} />
      </div>
    </div>
  );
}
