"use client";

import { ArrowDown, ArrowUp } from "@/components/images/Arrows";
import { Build, Permission } from "@/__generated__/graphql";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { DeleteBuildButton } from "@/components/buttons/DeleteBuild";
import { EditRecipeButton } from "@/components/buttons/EditRecipe";
import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";

export function BuildEditPopout({
  setopen,
  builds
}: {
  setopen: Dispatch<SetStateAction<boolean>>;
  builds: Build[];
}) {
  const index = useReactiveVar(currentBuild);
  const recipe = useReactiveVar(selectedRecipe);
  const [isVisible, setIsVisible] = useState(false);
  const { data: session } = useSession();
  const togglePopOut = () => {
    setIsVisible(!isVisible);
  };

  // Ensure index and recipe.userBuild[index] exist and permission is not undefined
  const build = builds[index];
  const permission = build?.permission || Permission.View;
  const createdBy = build?.createdBy;

  return (
    <div className="relative flex items-center justify-center">
      {/* New container */}
      <button onClick={togglePopOut} className="rounded px-4 py-2">
        {isVisible ? <ArrowDown /> : <ArrowUp />}
      </button>
      {isVisible && (
        <div className="bg-contrast absolute bottom-12 z-10 mx-auto w-40 border border-gray-300 p-4">
          <div className="pop-out-content flex flex-col items-center">
            <button
              onClick={() => setopen(true)}
              className="my-2 inline-block rounded border px-4 py-2 text-white"
            >
              Share
            </button>
            {permission &&
              [Permission.Edit, Permission.Manager, Permission.Owner].includes(
                permission
              ) && <EditRecipeButton builds={builds} />}
            {createdBy?.id === session?.user.id && (
              <DeleteBuildButton builds={builds} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
