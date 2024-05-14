import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "../images/Arrows";

import { BuildEditPopout } from "../modals/BuildEditPopout";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export async function BuildNavBar() {
  const recipe = useReactiveVar(selectedRecipe);

  const handleNextSlide = () => {
    console.log(recipe.userBuild.findIndex);
  };

  const handlePrevSlide = () => {};

  return (
    <nav className="fixed bottom-14 flex w-screen h-12 box-border z-10 justify-center items-center">
      <div className="grid grid-cols-3 grid-flow-row gap-8 mt-4">
        <div className="col-span-1 w-full flex items-center justify-center">
          <button
            onClick={handlePrevSlide}
            className={` ${recipe.userBuild.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowLeft />
          </button>
        </div>
        <div className="col-span-1 w-full">
          <BuildEditPopout />
        </div>
        <div className="col-span-1 w-full flex items-center justify-center">
          <button
            onClick={handleNextSlide}
            className={` ${recipe.userBuild.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </nav>
  );
}
