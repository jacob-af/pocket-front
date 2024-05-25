"use client";

import {
  Build,
  CompleteTouch,
  Permission,
  Recipe,
  Touch,
  TouchInput
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

    const mappedTouches = touches.map(
      ({ amount, id, ingredient, Unit }, index) => {
        return {
          amount,
          id,
          ingredient,
          Unit: {
            ...Unit,
            id: Unit.id || "" // Provide a default value if Unit.id is undefined
          },
          order: index
        };
      }
    );

    touchArray(mappedTouches);

    if (builds[slide].recipe.createdBy?.id == session?.user.id) {
      newRecipeInfo({
        id: builds[slide].id,
        name: builds[slide].recipe.name,
        buildName: builds[slide].buildName,
        about: builds[slide].recipe.about || "",
        instructions: builds[slide].instructions || "",
        glassware: builds[slide].glassware || "",
        ice: builds[slide].ice || "",
        touchArray: mappedTouches,
        newRecipe: true,
        permission: builds[slide].permission || Permission.View
      });
    } else {
      console.log(touches);
      newRecipeInfo({
        id: builds[slide].id,
        name: builds[slide].recipe.name,
        buildName: builds[slide].buildName,
        about: builds[slide].recipe.about || "",
        instructions: builds[slide].instructions || "",
        glassware: builds[slide].glassware || "",
        ice: builds[slide].ice || "",
        touchArray: touches.map(({ amount, id, ingredient, Unit }) => {
          return {
            amount,
            id,
            ingredient,
            Unit
          };
        }),
        newRecipe: false,
        permission: builds[slide].permission || Permission.View
      });
    }
    router.push("/db/editRecipe");
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
