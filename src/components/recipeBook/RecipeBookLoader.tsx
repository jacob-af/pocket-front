"use client";

import { Build, RecipeBook } from "@/__generated__/graphql";
import { useQuery, useReactiveVar } from "@apollo/client";

import RecipeBookDropDown from "./RecipeBookDropDown";
import { USER_BOOK_LIST } from "@/graphql/queries/recipeBook";
import { useEffect } from "react";
import { userRecipeBookList } from "@/graphql/reactiveVar/recipeBooks";

export default function RecipeBookLoader() {
  const { data, error, loading } = useQuery(USER_BOOK_LIST);
  const recipeBookList = useReactiveVar(userRecipeBookList);

  useEffect(() => {
    if (data?.userBookList) {
      userRecipeBookList(data.userBookList);
    }
    console.log("this happened");
  }, [data?.userBookList, data]);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="fixed top-11 h-16">
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
