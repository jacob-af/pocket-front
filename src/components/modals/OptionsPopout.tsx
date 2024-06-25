"use client";

import { ArrowDown, ArrowUp } from "@/components/images/Arrows";
import { Build, Permission } from "@/__generated__/graphql";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import AuthButton from "@/components/buttons/SignOutButton";
import { DeleteBuildButton } from "@/components/buttons/DeleteBuild";
import { EditRecipeButton } from "@/components/buttons/EditRecipe";
import { Hamburger } from "@/components/images/Images";
import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";

export function OptionsPopout() {
  const [isVisible, setIsVisible] = useState(false);
  const togglePopOut = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* New container */}
      <button onClick={togglePopOut} className="rounded py-2">
        <Hamburger />
      </button>
      {isVisible && (
        <div className="bg-contrast absolute -right-3 top-11 z-10 mx-auto w-40 border border-gray-300 p-4">
          <div className="pop-out-content flex flex-col items-center">
            <AuthButton />
          </div>
        </div>
      )}
    </div>
  );
}
