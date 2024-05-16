import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "../images/Arrows";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { BuildEditPopout } from "../modals/BuildEditPopout";
import { ShareRecipeModal } from "../modals/ShareRecipeModal";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export function BuildNavBar() {
  const recipe = useReactiveVar(selectedRecipe);
  const slide: number = useReactiveVar(currentBuild);
  const [openShare, setOpenShare] = useState(false);
  const handleNextSlide = () => {
    currentBuild((slide + 1) % recipe.userBuild.length);
  };

  const handlePrevSlide = () => {
    currentBuild(slide === 0 ? recipe.userBuild.length - 1 : slide - 1);
  };

  if (recipe.userBuild === undefined || recipe.userBuild.length === 0) {
    return <div>This recipe has no builds</div>;
  }

  return (
    <nav className="z-10 mt-auto box-border flex h-10 w-screen items-center justify-center">
      <div className="mt-4 grid grid-flow-row grid-cols-3 gap-8">
        <div className="col-span-1 flex w-full items-center justify-center">
          <button
            onClick={handlePrevSlide}
            className={` ${recipe.userBuild.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowLeft />
          </button>
        </div>
        <div className="col-span-1 w-full">
          <BuildEditPopout setopen={setOpenShare} />
        </div>
        <div className="col-span-1 flex w-full items-center justify-center">
          <button
            onClick={handleNextSlide}
            className={` ${recipe.userBuild.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <ShareRecipeModal
        open={openShare}
        toggleopen={setOpenShare}
        build={recipe.userBuild[slide]}
      />
    </nav>
  );
}
