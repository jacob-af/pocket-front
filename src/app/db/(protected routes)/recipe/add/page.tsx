"use client";

import * as React from "react";
import { useQuery } from "@apollo/client";
import { RECIPE_LIST } from "@/app/graphql/queries/recipe";
import { ListItem } from "@/__generated__/graphql";
import { allRecipesList } from "@/app/graphql/reactiveVar/recipes";
import { useSession } from "next-auth/react";

import RecipeSelect from "./components/RecipeSelect";
import BuildDetails from "./components/BuildDetails";
import BuildInstructions from "./components/BuildInstructions";
import Review from "./components/Review";
import { Tab } from "@headlessui/react";

export default function AddRecipe() {
  const { status: sessionStatus } = useSession();
  const { data, loading, error } = useQuery(RECIPE_LIST, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-first"
  });
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Get the list from data and filter out undefined values
  const recipeList: ListItem[] = data?.recipeList ?? [];
  const filteredList = recipeList.filter(item => item !== undefined);

  const sortedList = filteredList.sort((a, b) => a.name.localeCompare(b.name));

  allRecipesList(sortedList);
  return (
    <div className="flex flex-col bg-gray-900 shadow-md mx-auto p-4 rounded-lg w-full md:w-1/2">
      <Tab.Group>
        <Tab.List className="flex justify-around border-gray-300 border-b">
          <Tab className="hover:bg-gray-200 p-2 rounded-lg">Recipe Info</Tab>
          <Tab className="hover:bg-gray-200 p-2 rounded-lg">Ingredients</Tab>
          <Tab className="hover:bg-gray-200 p-2 rounded-lg">Instructions</Tab>
          <Tab className="hover:bg-gray-200 p-2 rounded-lg">Review</Tab>
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel className="p-4">
            <RecipeSelect />
          </Tab.Panel>
          <Tab.Panel className="p-4">
            <BuildDetails />
          </Tab.Panel>
          <Tab.Panel className="p-4">
            <BuildInstructions />
          </Tab.Panel>
          <Tab.Panel className="p-4">Content 4</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
