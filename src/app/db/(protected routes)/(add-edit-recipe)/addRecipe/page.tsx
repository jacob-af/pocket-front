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
import { RECIPES_AND_INGREDIENTS } from "@/graphql/queries/recipe";
import RecipeInput from "@/components/recipe/input";
import Review from "@/components/recipe/input/Review";
import { alertList } from "@/graphql/reactiveVar/alert";
import { allIngredientsList } from "@/graphql/reactiveVar/ingredients";
import { cutive } from "@/lib/cutive";
import { useRouter } from "next/navigation";

export default function AddRecipe() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const [newBuild] = useMutation(ADD_BUILD, {
    refetchQueries: [RECIPES_AND_INGREDIENTS]
  });
  const touches = useReactiveVar(touchArray);
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const alerts = useReactiveVar(alertList);
  const router = useRouter();

  // Query data
  const { data, loading, error } = useQuery(RECIPES_AND_INGREDIENTS, {
    fetchPolicy: "cache-and-network"
  });
  console.log();

  // Update reactive variables when the lists change
  useEffect(() => {
    console.log("unconditional too");
    if (data?.ingredients) {
      allIngredientsList(data.ingredients);
    }
    if (data?.publicRecipeList) {
      allRecipesList(data.publicRecipeList);
    }
  }, [data?.publicRecipeList, data?.ingredients]);

  if (error) {
    alertList([...alerts, { code: "error", message: error.message }]);
    return <div>{error.message}</div>;
  }

  const submitRecipe = async () => {
    console.log(recipeInfo.newRecipe, recipeInfo.name);
    try {
      if (recipeInfo.newRecipe) {
        const { data } = await newRecipe({
          variables: {
            createRecipeInput: {
              recipeName: recipeInfo.name,
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
        console.log(recipeInfo.name);
        const { data } = await newBuild({
          variables: {
            createBuildInput: {
              recipe: { name: recipeInfo.name },
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
      newRecipeInfo(recipeBlank);
      router.push("/db/recipe");
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alertList([...alerts, { code: "error", message: errorMessage }]);
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
    <div className="mx-auto mt-12 flex w-full flex-col rounded-lg bg-gray-900 p-4 shadow-md md:w-2/3">
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
          className={`${cutive.className} antialiased bg-black text-white`}
          label={<span className={`${cutive.className}`}>Recipe Details</span>}
        />
        <Tab
          label={<span className={`${cutive.className}`}>Instructions</span>}
          className={`${cutive.className} antialiased bg-black text-white`}
        />
        <Tab
          label={<span className={`${cutive.className}`}>Review</span>}
          className={`${cutive.className} antialiased bg-black text-white`}
        />
      </Tabs>

      {/* Conditionally render tab panels based on selectedIndex */}
      {selectedIndex === 0 && (
        <div className="p-4">
          <RecipeInput />
          <button
            className="float-right mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white"
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
            className="float-left mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white"
            onClick={() => setSelectedIndex(0)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="float-right mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white"
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
            className="float-left mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white"
            onClick={() => setSelectedIndex(1)} // Move to Instructions panel
          >
            Back
          </button>
          <button
            className="float-right mt-4 rounded-lg bg-gray-500 px-4 py-2 text-white"
            onClick={submitRecipe} // Move to Instructions panel
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
