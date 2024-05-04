import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { BuildDetails } from "./BuildDetails";
import { BuildName } from "./BuildName";
import RecipeSelect from "./RecipeSelect";
import { AddTouch } from "./AddTouch";
import { RecipeAbout } from "./RecipeAbout";

export default function RecipeInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="flex flex-col items-center min-w-xl">
      <RecipeSelect />
      {recipeInfo.newRecipe === true ? <RecipeAbout /> : <></>}
      <BuildName />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
