"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { RECIPES_AND_INGREDIENTS } from "@/app/graphql/queries/recipe";
import { ListItem } from "@/__generated__/graphql";
import { allRecipesList } from "@/app/graphql/reactiveVar/recipes";
import { useSession } from "next-auth/react";
import RecipeInput from "./components/RecipeInput";
import BuildInstructions from "./components/RecipeInstructions";
import Review from "./components/Review";
import { Tabs, Tab } from "@mui/material";
import { allIngredientsList } from "@/app/graphql/reactiveVar/ingredients";
import { pressStart } from "@/lib/pressStart";

export default function AddRecipe() {
  const { status: sessionStatus } = useSession();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Query data
  const { data, loading, error } = useQuery(RECIPES_AND_INGREDIENTS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-first"
  });

  // Memoized and sorted lists
  const recipeList = useMemo(() => {
    const list = data?.recipeList || [];
    return list
      .filter(item => item !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const ingredientList = useMemo(() => {
    const list = data?.ingredients || [];
    return list
      .filter(item => item !== undefined)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  // Update reactive variables when the lists change
  useEffect(() => {
    allRecipesList(recipeList);
    allIngredientsList(ingredientList);
  }, [recipeList, ingredientList]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    return <div>Error loading data</div>; // Display an error message
  }

  return (
    <div className="flex flex-col bg-gray-900 shadow-md mx-auto p-4 rounded-lg w-full md:w-2/3">
      <Tabs
        value={selectedIndex}
        onChange={(_, newValue) => setSelectedIndex(newValue)}
        variant="fullWidth"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#000000"
          }
        }}
      >
        <Tab
          label="Recipe Info"
          className={`${pressStart.className} antialiased bg-black text-white`}
        />
        <Tab
          label="Instructions"
          className={`${pressStart.className} antialiased bg-black text-white`}
        />
        <Tab
          label="Review"
          className={`${pressStart.className} antialiased bg-black text-white`}
        />
      </Tabs>

      {/* Conditionally render tab panels based on selectedIndex */}
      {selectedIndex === 0 && (
        <div className="p-4">
          <RecipeInput />
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg float-right"
            onClick={() => setSelectedIndex(1)} // Move to Instructions panel
          >
            Next
          </button>
        </div>
      )}
      {selectedIndex === 1 && (
        <div className="p-4">
          <BuildInstructions />
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg float-left"
            onClick={() => setSelectedIndex(0)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg float-right"
            onClick={() => setSelectedIndex(2)} // Move to Instructions panel
          >
            Next
          </button>
        </div>
      )}
      {selectedIndex === 2 && (
        <div className="p-4">
          <Review />
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg float-left"
            onClick={() => setSelectedIndex(1)} // Move to Instructions panel
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
