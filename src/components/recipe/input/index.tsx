import { AddTouch } from "../../buttons/AddTouch";
import { BuildDetails } from "./BuildDetails";
import { BuildName } from "./BuildName";
import { RecipeAbout } from "./RecipeAbout";
import RecipeSelect from "./RecipeSelect";
import UnitSelector from "./UnitSelector";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="min-w-xl box-border flex flex-col items-center">
      <RecipeSelect />
      {recipeInfo.newRecipe === true ? <RecipeAbout /> : <></>}
      <BuildName />
      <UnitSelector />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
