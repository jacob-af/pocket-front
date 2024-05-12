import { AddTouch } from "../../buttons/AddTouch";
import { BuildDetails } from "./BuildDetails";
import { BuildName } from "./BuildName";
import { RecipeAbout } from "./RecipeAbout";
import { RecipeName } from "./RecipeName";
import RecipeSelect from "./RecipeSelect";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function EditInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="flex flex-col items-center min-w-xl box-border h-full overflow-scroll">
      {recipeInfo.newRecipe === true ? (
        <>
          <RecipeName />
          <RecipeAbout />
        </>
      ) : (
        <></>
      )}
      <BuildName />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
