import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { BuildDetails } from "./RecipeInput/BuildDetails";
import { BuildName } from "./RecipeInput/BuildName";
import RecipeSelect from "./RecipeInput/RecipeSelect";
import { AddTouch } from "./RecipeInput/AddTouch";
import { RecipeAbout } from "./RecipeInput/RecipeAbout";

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
