import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { BuildDetails } from "./RecipeInput/BuildDetails";
import { BuildName } from "./RecipeInput/BuildName";
import RecipeSelect from "./RecipeInput/RecipeSelect";
import { AddTouch } from "./RecipeInput/AddTouch";

export default function RecipeInput() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="flex flex-col items-center min-w-xl">
      <RecipeSelect />
      <BuildName />
      <BuildDetails />
      <AddTouch />
    </div>
  );
}
