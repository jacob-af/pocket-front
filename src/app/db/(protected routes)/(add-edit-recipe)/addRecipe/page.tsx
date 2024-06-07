"use client";

import { ADD_BUILD, ADD_RECIPE } from "@/graphql/mutations/recipes";
import { Tab, Tabs } from "@mui/material";
import {
  allRecipesList,
  newRecipeInfo,
  recipeBlank,
  touchArray
} from "@/graphql/reactiveVar/recipes";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import BuildInstructions from "@/components/recipe/input/BuildInstructions";
import PictureUpload from "@/components/recipe/input/PictureUpload";
import { RECIPES_AND_INGREDIENTS } from "@/graphql/queries/recipe";
import RecipeInput from "@/components/recipe/input";
import Review from "@/components/recipe/input/Review";
import { allIngredientsList } from "@/graphql/reactiveVar/ingredients";
import { cutive } from "@/lib/cutive";
import useAddRecipe from "@/hooks/useAddRecipe";
import { useRouter } from "next/navigation";

export default function AddRecipe() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const submitRecipe = useAddRecipe();

  const { data, loading, error } = useQuery(RECIPES_AND_INGREDIENTS, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data) {
      allIngredientsList(data.ingredients);
      allRecipesList(data.publicRecipeList);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-auto my-12 box-border flex w-full max-w-2xl flex-col rounded-lg p-4 shadow-md">
      {loading ? "loading" : ""}
      <Tabs
        value={selectedIndex}
        onChange={(_, newValue) => setSelectedIndex(newValue)}
        variant="fullWidth"
        textColor="inherit"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#000000",
            fontFamily: `${cutive.style.fontFamily}`
          }
        }}
      >
        <Tab
          className={`${cutive.className} antialiased bg-contrast`}
          label={
            <span className={`${cutive.className} text-sm md:text-base`}>
              Recipe Details
            </span>
          }
        />
        <Tab
          label={
            <span className={`${cutive.className} text-sm md:text-base`}>
              Instructions
            </span>
          }
          className={`${cutive.className} antialiased bg-contrast`}
        />
        <Tab
          label={
            <span className={`${cutive.className} text-sm md:text-base`}>
              Add Photo
            </span>
          }
          className={`${cutive.className} antialiased bg-contrast`}
        />
        <Tab
          label={
            <span className={`${cutive.className} text-sm md:text-base`}>
              Review
            </span>
          }
          className={`${cutive.className} antialiased bg-contrast`}
        />
      </Tabs>

      {/* Conditionally render tab panels based on selectedIndex */}
      {selectedIndex === 0 && (
        <div className="p-4 pb-12">
          <RecipeInput />
          <button
            className="text-primary float-right mt-4 rounded-lg bg-gray-500 px-4 py-2"
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
            className="text-primary float-left mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={() => setSelectedIndex(0)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="text-primary float-right mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={() => setSelectedIndex(2)} // Move to Instructions panel
          >
            Next
          </button>
        </div>
      )}
      {selectedIndex === 2 && (
        <div className="p-4">
          <PictureUpload />
          <button
            className="text-primary float-left mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={() => setSelectedIndex(1)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="text-primary float-right mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={() => setSelectedIndex(3)} // Move to Instructions panel
          >
            Next
          </button>
        </div>
      )}
      {selectedIndex === 3 && (
        <div className="p-4">
          <Review />
          <button
            className="text-primary float-left mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={() => setSelectedIndex(2)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="text-primary float-right mt-4 rounded-lg bg-gray-500 px-4 py-2"
            onClick={submitRecipe} // Move to Instructions panel
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
