"use client";

import { EDIT_BUILD, EDIT_RECIPE } from "@/graphql/mutations/recipes";
import {
  RECIPES_AND_INGREDIENTS,
  USER_RECIPES
} from "@/graphql/queries/recipe";
import { Tab, Tabs } from "@mui/material";
import {
  allRecipesList,
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/graphql/reactiveVar/recipes";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import BuildInstructions from "@/components/recipe/input/BuildInstructions";
import EditInput from "@/components/recipe/input/EditInput";
import PictureUpload from "@/components/recipe/input/PictureUpload";
import Review from "@/components/recipe/input/Review";
import { alertList } from "@/graphql/reactiveVar/alert";
import { allIngredientsList } from "@/graphql/reactiveVar/ingredients";
import { cutive } from "@/lib/cutive";
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
    if (data?.publicRecipeList) {
      allRecipesList(data?.publicRecipeList);
    }
    if (data?.ingredients) {
      allIngredientsList(data.ingredients);
    }
    if (recipeInfo.name === "") {
      router.push("/db/recipe");
    }
  }, [data?.publicRecipeList, data?.ingredients, recipeInfo, router]);

  if (error) {
    return <div>{error.message}</div>;
  }

  const submitRecipe = async () => {
    console.log(touches);
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
                image: recipeInfo.image,
                touchArray: touches.map(({ amount, id, ingredient, unit }) => {
                  return {
                    amount,
                    id,
                    ingredientName: ingredient.name,
                    unit
                  };
                }),
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
              image: recipeInfo.image,
              touchArray: touches.map(({ amount, id, ingredient, unit }) => {
                return {
                  amount,
                  id,
                  ingredientName: ingredient.name,
                  unit
                };
              }),
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
        publicBuild: [],
        userBuild: []
      });
      router.push(`/db/recipe/${recipeInfo.name}`);
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
    <div className="mx-auto my-12 flex w-full flex-col rounded-lg bg-gray-900 p-4 shadow-md md:w-2/3">
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
          label={<span className={`${cutive.className}`}>Recipe Details</span>}
        />
        <Tab
          label={<span className={`${cutive.className}`}>Instructions</span>}
          className={`${cutive.className} antialiased bg-contrast`}
        />
        <Tab
          label={<span className={`${cutive.className}`}>Add Photo</span>}
          className={`${cutive.className} antialiased bg-contrast`}
        />
        <Tab
          label={<span className={`${cutive.className}`}>Review</span>}
          className={`${cutive.className} antialiased bg-contrast`}
        />
      </Tabs>

      {/* Conditionally render tab panels based on selectedIndex */}
      {selectedIndex === 0 && (
        <div className="p-4">
          <EditInput />
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
