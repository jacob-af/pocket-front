"use client";

import {
  Build,
  CompleteTouch,
  Permission,
  Recipe,
  Touch
} from "@/__generated__/graphql";
import {
  blankTouch,
  currentBuild,
  newRecipeInfo,
  recipeBlank,
  selectedRecipe,
  touchArray
} from "@/graphql/reactiveVar/recipes";

// import { convertArrayByOrder } from "@/components/recipe/recipeActions";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const EditRecipeButton = ({ builds }: { builds: Build[] }) => {
  const slide: number = useReactiveVar(currentBuild);
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = () => {
    const touches: Touch[] = builds[slide].touch;
    touchArray(touches);

    if (builds[slide].recipe.createdBy?.id == session?.user.id) {
      newRecipeInfo({
        id: builds[slide].id,
        name: builds[slide].recipe.name,
        buildName: builds[slide].buildName,
        about: builds[slide].recipe.about || "",
        instructions: builds[slide].instructions || "",
        glassware: builds[slide].glassware || "",
        ice: builds[slide].ice || "",
        touchArray: touches.map(({ amount, id, ingredient, unit }) => {
          return {
            amount,
            id,
            ingredientName: ingredient.name,
            unit
          };
        }),
        newRecipe: true,
        permission: builds[slide].permission || Permission.View
      });
    } else {
      newRecipeInfo({
        id: builds[slide].id,
        name: builds[slide].recipe.name,
        buildName: builds[slide].buildName,
        about: builds[slide].recipe.about || "",
        instructions: builds[slide].instructions || "",
        glassware: builds[slide].glassware || "",
        ice: builds[slide].ice || "",
        touchArray: touches.map(({ amount, id, ingredient, unit }) => {
          return {
            amount,
            id,
            ingredientName: ingredient.name,
            unit
          };
        }),
        newRecipe: false,
        permission: builds[slide].permission || Permission.View
      });
    }
    router.push("/db/recipe/edit");
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="my-2 inline-block rounded bg-gray-500 px-4 py-2 text-white"
      >
        Edit
      </button>
    </>
  );
};
