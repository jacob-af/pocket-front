"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { DeleteBuildModal } from "@/components/modals/DeleteBuildModal";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export const DeleteBuildButton = ({ builds }: { builds: Build[] }) => {
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
        build={builds[slide]}
        open={openDelete}
        toggleopen={setOpenDelete}
      />
    </>
  );
};
