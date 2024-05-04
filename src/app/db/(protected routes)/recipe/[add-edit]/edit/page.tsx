"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { RECIPES_AND_INGREDIENTS } from "@/app/graphql/queries/recipe";
import { ListItem } from "@/__generated__/graphql";
import {
  allRecipesList,
  newRecipeInfo,
  touchArray
} from "@/app/graphql/reactiveVar/recipes";
import { useSession } from "next-auth/react";
import RecipeInput from "../components/recipeInput";
import BuildInstructions from "../components/RecipeInstructions";
import { useRouter } from "next/navigation";
import Review from "../components/Review";
import { Tabs, Tab } from "@mui/material";
import { allIngredientsList } from "@/app/graphql/reactiveVar/ingredients";
import { pressStart } from "@/lib/pressStart";
import { ADD_BUILD, ADD_RECIPE } from "@/app/graphql/mutations/recipes";

export default function AddRecipe() {
  const { status: sessionStatus } = useSession();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const [newBuild] = useMutation(ADD_BUILD, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const touches = useReactiveVar(touchArray);
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const router = useRouter();

  // Query data
  const { data, loading, error } = useQuery(RECIPES_AND_INGREDIENTS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network" // Change fetchPolicy to "network-only"
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

  const submitRecipe = async () => {
    console.log(recipeInfo.newRecipe, recipeInfo.recipeName);
    try {
      if (recipeInfo.newRecipe) {
        const { data } = await newRecipe({
          variables: {
            createRecipeInput: {
              recipeName: recipeInfo.recipeName,
              about: recipeInfo.about,
              build: {
                buildName: recipeInfo.buildName,
                instructions: recipeInfo.instructions,
                glassware: recipeInfo.glassware,
                ice: recipeInfo.ice,
                touchArray: [...touches]
              }
            }
          }
        });
        console.log(data);
      } else {
        console.log(recipeInfo.recipeName);
        const { data } = await newBuild({
          variables: {
            createBuildInput: {
              recipe: { name: recipeInfo.recipeName },
              buildName: recipeInfo.buildName,
              instructions: recipeInfo.instructions,
              glassware: recipeInfo.glassware,
              ice: recipeInfo.ice,
              touchArray: [...touches]
            }
          }
        });
        console.log(data);
      }

      router.push("/db/recipe");
    } catch (error) {
      console.log(error);
    }
  };

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>; // Display a loading message
  }

  if (error) {
    console.log(error);
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
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg float-right"
            onClick={submitRecipe} // Move to Instructions panel
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
