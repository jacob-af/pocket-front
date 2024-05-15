"use client";

import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { DeleteBuildModal } from "@/components/modals/DeleteBuildModal";
import { Recipe } from "@/__generated__/graphql";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export const DeleteBuildButton = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const slide: number = useReactiveVar(currentBuild);
  const recipe: Recipe = useReactiveVar(selectedRecipe);

  const handleDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="my-2 inline-block rounded bg-red-500 px-4 py-2 text-white"
      >
        Delete
      </button>
      <DeleteBuildModal
        build={recipe.userBuild[slide]}
        open={openDelete}
        toggleopen={setOpenDelete}
      />
    </>
  );
};
