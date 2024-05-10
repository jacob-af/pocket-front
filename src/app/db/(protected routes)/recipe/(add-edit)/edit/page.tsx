"use client";

import { EDIT_BUILD, EDIT_RECIPE } from "@/app/graphql/mutations/recipes";
import {
  RECIPES_AND_INGREDIENTS,
  USER_RECIPES
} from "@/app/graphql/queries/recipe";
import { Tab, Tabs } from "@mui/material";
import {
  allRecipesList,
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/app/graphql/reactiveVar/recipes";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import BuildInstructions from "../components/RecipeInstructions";
import EditInput from "@/app/components/recipe/input/EditInput";
import Review from "../components/Review";
import { alertList } from "@/app/graphql/reactiveVar/alert";
import { allIngredientsList } from "@/app/graphql/reactiveVar/ingredients";
import { pressStart } from "@/lib/pressStart";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AddRecipe() {
  const { status: sessionStatus } = useSession();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [updateRecipe] = useMutation(EDIT_RECIPE, {
    refetchQueries: [RECIPES_AND_INGREDIENTS, USER_RECIPES]
  });
  const [updateBuild] = useMutation(EDIT_BUILD, {
    refetchQueries: [RECIPES_AND_INGREDIENTS, USER_RECIPES]
  });

  const touches = useReactiveVar(touchArray);
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const alerts = useReactiveVar(alertList);
  const router = useRouter();

  // Query data
  const { data, loading, error } = useQuery(RECIPES_AND_INGREDIENTS, {
    skip: sessionStatus !== "authenticated",
    fetchPolicy: "cache-and-network"
  });

  // Update reactive variables when the lists change
  useEffect(() => {
    console.log("unconditional three");
    if (data?.recipeList) {
      allRecipesList(data?.recipeList);
    }
    if (data?.ingredients) {
      allIngredientsList(data.ingredients);
    }
    if (recipeInfo.name === "") {
      router.push("/db/recipe");
    }
  }, [data?.recipeList, data?.ingredients, recipeInfo, router]);

  if (error) {
    return <div>{error.message}</div>;
  }

  const submitRecipe = async () => {
    console.log(recipeInfo.newRecipe, recipeInfo.name);
    try {
      if (recipeInfo.newRecipe) {
        const { data } = await updateRecipe({
          variables: {
            updateRecipeInput: {
              id: recipeInfo.id,
              name: recipeInfo.name,
              about: recipeInfo.about,
              build: {
                buildId: recipeInfo.id,
                buildName: recipeInfo.buildName,
                instructions: recipeInfo.instructions,
                glassware: recipeInfo.glassware,
                ice: recipeInfo.ice,
                touchArray: [...touches],
                permission: recipeInfo.permission
              }
            }
          }
        });
        console.log(data);
        alertList([
          ...alerts,
          {
            code: "success",
            message: `${recipeInfo.name} successfully updated`
          }
        ]);
      } else {
        console.log(recipeInfo.name);
        const { data } = await updateBuild({
          variables: {
            updateBuildInput: {
              buildId: recipeInfo.id,
              recipe: { name: recipeInfo.name },
              buildName: recipeInfo.buildName,
              instructions: recipeInfo.instructions,
              glassware: recipeInfo.glassware,
              ice: recipeInfo.ice,
              touchArray: [...touches],
              permission: recipeInfo.permission
            }
          }
        });
        console.log(data);
        alertList([
          ...alerts,
          {
            code: "success",
            message: `Build "${recipeInfo.buildName}" successfully updated for ${recipeInfo.name}`
          }
        ]);
      }
      selectedRecipe({
        id: "",
        name: "",
        about: "",
        build: [],
        userBuild: []
      });
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
          <EditInput />
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
