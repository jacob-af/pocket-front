import {
  ArrowLeft,
  ArrowRight,
  DoubleArrowLeft,
  DoubleArrowRight
} from "../images/Arrows";
import { Build, Recipe } from "@/__generated__/graphql";
import {
  currentBuild,
  currentRecipe,
  selectedRecipe,
  userRecipeList
} from "@/graphql/reactiveVar/recipes";

import { BuildEditPopout } from "../modals/BuildEditPopout";
import { ShareRecipeModal } from "../modals/ShareRecipeModal";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function BuildNavBar({ builds }: { builds: Build[] }) {
  const { data: session } = useSession();
  const router = useRouter();
  const slide: number = useReactiveVar(currentBuild);
  const recipes: Recipe[] = useReactiveVar(userRecipeList);
  const [openShare, setOpenShare] = useState(false);

  const handleNextSlide = () => {
    currentBuild((slide + 1) % builds.length);
  };

  const handlePrevSlide = () => {
    currentBuild(slide === 0 ? builds.length - 1 : slide - 1);
  };

  const handleNextRecipe = () => {
    const index = recipes.findIndex(recipe => {
      return recipe.name === builds[0].recipe.name;
    });
    console.log(recipes, index);
    selectedRecipe(recipes[index + 1]);
    currentBuild(0);
    if (session) {
      router.push(`/db/recipe/${recipes[(index + 1) % recipes.length].name}`);
    } else {
      router.push(`/recipe/${recipes[(index + 1) % recipes.length].name}`);
    }
  };

  const handlePrevRecipe = () => {
    const index = recipes.findIndex(
      recipe => recipe.name === builds[0].recipe.name
    );
    selectedRecipe(recipes[index - 1]);
    currentBuild(0);
    if (session) {
      router.push(`/db/recipe/${recipes[index - 1].name}`);
    } else {
      router.push(`/recipe/${recipes[index - 1].name}`);
    }
  };

  console.log(builds, ":builds from navbar");
  if (!builds) {
    return <div>This recipe has no builds</div>;
  }

  return (
    <nav className="z-10 mt-auto box-border flex h-10 w-screen items-center justify-center">
      <div className="mx-7 grid grid-cols-5 gap-1">
        <div className="col-span-1 flex w-full items-center justify-center">
          <button onClick={handlePrevRecipe}>
            <DoubleArrowLeft />
          </button>
        </div>
        <div className="col-span-1 flex w-full items-center justify-center">
          <button
            onClick={handlePrevSlide}
            className={` ${builds.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowLeft />
          </button>
        </div>
        <div className="col-span-1 w-full">
          {!!session && (
            <BuildEditPopout setopen={setOpenShare} builds={builds} />
          )}
        </div>
        <div className="col-span-1 flex w-full items-center justify-center">
          <button
            onClick={handleNextSlide}
            className={` ${builds.length >= 2 ? "" : "hidden"}`}
          >
            <ArrowRight />
          </button>
        </div>
        <div className="col-span-1 flex w-full items-center justify-center">
          <button onClick={handleNextRecipe}>
            <DoubleArrowRight />
          </button>
        </div>
        <div className="col-span-5 flex w-full items-center justify-center">
          Explore Different Builds
        </div>
      </div>
      <ShareRecipeModal
        open={openShare}
        toggleopen={setOpenShare}
        build={builds[slide]}
      />
    </nav>
  );
}
