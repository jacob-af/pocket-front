import { AddTouch } from "./AddTouch";
import { BuildDetails } from "./BuildDetails";
import { BuildName } from "./BuildName";
import { RecipeAbout } from "./RecipeAbout";
import RecipeSelect from "./RecipeSelect";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="flex flex-col items-center min-w-xl box-border h-full overflow-scroll">
      <RecipeSelect />
      {recipeInfo.newRecipe === true ? <RecipeAbout /> : <></>}
      <BuildName />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
