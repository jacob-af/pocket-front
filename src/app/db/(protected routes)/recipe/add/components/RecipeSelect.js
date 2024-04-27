import PropDown from "../../components/PropDown";
import { ListItem } from "@/__generated__/graphql";
import {
  allRecipesList,
  selectedRecipeId
} from "@/app/graphql/reactiveVar/recipes";
import { recipeChange } from "../../components/recipeHooks";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeSelect({}) {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div>
      Select a recipe or create a new one?
      {allRecipesList.length > 0 ? (
        <PropDown
          list={allRecipesList}
          selector={selectedRecipeId}
          handleChange={recipeChange}
        />
      ) : (
        ""
      )}
      {recipeInfo.newRecipe ? "About" : "Build Name"}
    </div>
  );
}
