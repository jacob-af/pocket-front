"use client";

import { useQuery, useReactiveVar } from "@apollo/client";

import Link from "next/link";
import ShortCard from "./components/ShortCard";
import { userRecipeList } from "@/app/graphql/reactiveVar/recipes";

export default function Recipe() {
  const recipeList = useReactiveVar(userRecipeList);

  return (
    <div className="h-full flex flex-col content-center max-w-2xl overflow-auto">
      {recipeList.map(recipe => {
        return <ShortCard key={recipe.id} recipe={recipe} />;
      })}

      <Link
        href="/db/recipe/add"
        className="btn-secondary fixed bottom-16 right-4 bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600"
      >
        Add Recipe
      </Link>
    </div>
  );
}
