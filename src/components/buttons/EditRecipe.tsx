"use client";

import { Permission, Recipe, Touch } from "@/__generated__/graphql";
import {
  currentBuild,
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/graphql/reactiveVar/recipes";

// import { convertArrayByOrder } from "@/components/recipe/recipeActions";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const EditRecipeButton = () => {
  const slide: number = useReactiveVar(currentBuild);
  const recipe: Recipe = useReactiveVar(selectedRecipe);
  const router = useRouter();
  const { data: session } = useSession();

  const handleEdit = () => {
    const builds = recipe.userBuild;
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
        touchArray: touches,
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
        touchArray: touches,
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
