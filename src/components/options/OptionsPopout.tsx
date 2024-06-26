"use client";

import { ArrowDown, ArrowUp } from "@/components/images/Arrows";
import { Build, Permission } from "@/__generated__/graphql";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import AuthButton from "@/components/buttons/SignOutButton";
import CrewOptions from "./CrewOptions";
import { DeleteBuildButton } from "@/components/buttons/DeleteBuild";
import { EditRecipeButton } from "@/components/buttons/EditRecipe";
import { Hamburger } from "@/components/images/Images";
import InventoryOptions from "./InventoryOptions";
import LandingOptions from "./LandingOptions";
import ProfileOptions from "./ProfileOptions";
import RecipeBookOptions from "./RecipeBookOptions";
import RecipeOptions from "./RecipeOptions";
import { usePathname } from "next/navigation";
import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";

export function OptionsPopout() {
  const [isVisible, setIsVisible] = useState(false);
  const togglePopOut = () => {
    setIsVisible(!isVisible);
  };

  const pathname = usePathname();

  let componentToRender;
  if (pathname.startsWith("/db/recipeBook")) {
    componentToRender = <RecipeBookOptions />;
  } else {
    switch (pathname) {
      case "/db":
        componentToRender = <LandingOptions />;
        break;
      case "/db/inventory":
        componentToRender = <InventoryOptions />;
        break;
      case "/db/recipeBook":
        componentToRender = <RecipeBookOptions />;
        break;
      case "/db/recipe":
        componentToRender = <RecipeOptions />;
        break;
      case "/db/crew":
        componentToRender = <CrewOptions />;
        break;
      case "/db/profile":
        componentToRender = <ProfileOptions />;
        break;
      default:
        componentToRender = <LandingOptions />;
        break;
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* New container */}
      <button onClick={togglePopOut} className="rounded py-2">
        <Hamburger />
      </button>
      {isVisible && (
        <div className="bg-contrast absolute -right-3 top-11 z-10 mx-auto h-auto w-80 border border-gray-300 p-4">
          <div className="pop-out-content flex flex-col items-center">
            {componentToRender}
            <AuthButton />
          </div>
        </div>
      )}
    </div>
  );
}
