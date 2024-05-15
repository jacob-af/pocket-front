"use client";

import { ArrowDown, ArrowUp } from "@/components/images/Arrows";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { DeleteBuildButton } from "@/components/buttons/DeleteBuild";
import { EditRecipeButton } from "@/components/buttons/EditRecipe";
import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";

export function BuildEditPopout({
  setopen
}: {
  setopen: Dispatch<SetStateAction<boolean>>;
}) {
  const index = useReactiveVar(currentBuild);
  const recipe = useReactiveVar(selectedRecipe);
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const togglePopOut = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* New container */}
      <button onClick={togglePopOut} className="rounded px-4 py-2">
        {isVisible ? <ArrowDown /> : <ArrowUp />}
      </button>
      {isVisible && (
        <div className="absolute bottom-12 z-10 mx-auto w-40 border border-gray-300 bg-black p-4">
          <div className="pop-out-content flex flex-col items-center">
            <button
              onClick={() => setopen(true)}
              className="my-2 inline-block rounded border px-4 py-2 text-white"
            >
              Share
            </button>
            {!recipe.userBuild[index]
              ? ""
              : ["EDIT", "MANAGER", "OWNER"].includes(
                  recipe.userBuild[index].permission
                ) && <EditRecipeButton />}
            {recipe.userBuild[index].createdBy?.id == session?.user.id && (
              <DeleteBuildButton />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
