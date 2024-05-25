import { AddTouch } from "../../buttons/AddTouch";
import { BuildDetails } from "./BuildDetails";
import { BuildName } from "./BuildName";
import { RecipeAbout } from "./RecipeAbout";
import { RecipeName } from "./RecipeName";
import RecipeSelect from "./RecipeSelect";
import UnitSelector from "./UnitSelector";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function EditInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="min-w-xl box-border flex h-full flex-col items-center overflow-scroll">
      {recipeInfo.newRecipe === true ? (
        <>
          <RecipeName />
          <RecipeAbout />
        </>
      ) : (
        <></>
      )}
      <BuildName />
      <UnitSelector />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
