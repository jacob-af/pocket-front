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
    console.log("this happened");
  }, [data?.userRecipeBooks]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="fixed top-14 h-16">
      <div className="flex w-72">
        <RecipeBookDropDown
          recipeBooks={recipeBookList}
          loading={
            recipeBookList.length === 0 && loading
              ? "Loading..."
              : recipeBookList.length > 0 && loading
              ? `Updating...`
              : `Recipe Book Search`
          }
        />
      </div>
    </div>
  );
}
