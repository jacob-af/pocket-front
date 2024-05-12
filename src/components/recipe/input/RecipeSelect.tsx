import { allRecipesList, newRecipeInfo } from "@/graphql/reactiveVar/recipes";

import { AboutModal } from "@/components/modals/NewRecipeModal";
import { ListItem } from "@/__generated__/graphql";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { recipeChange } from "@/components/recipe/recipeActions";
import { useReactiveVar } from "@apollo/client";

export default function RecipeSelect() {
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const allRecipes = useReactiveVar(allRecipesList);

  return (
    <div className="flex flex-col items-center text-center min-w-sm">
      Select a recipe or create a new one?
      {allRecipes.length > 0 ? (
        <MuiDropDown
          options={allRecipes}
          handleChange={recipeChange}
          index={98}
          currentValue={
            {
              ...recipeInfo
            } as ListItem
          }
        >
          <AboutModal
            open={false}
            toggleopen={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </MuiDropDown>
      ) : (
        ""
      )}
    </div>
  );
}
