import {
  allRecipesList,
  newRecipeInfo
} from "@/app/graphql/reactiveVar/recipes";
import { recipeChange } from "../recipeHooks";
import MuiDropDown from "../MUIDropDown";
import MuiDropDownWModal from "./MUIDropDownWModal";
import { AboutModal } from "./AboutModal";
import { useReactiveVar } from "@apollo/client";

export default function RecipeSelect() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="flex flex-col items-center text-center">
      Select a recipe or create a new one?
      {allRecipesList.length > 0 ? (
        <MuiDropDownWModal
          list={allRecipesList}
          handleChange={recipeChange}
          index={0}
          currentValue={recipeInfo.recipeName}
        >
          <AboutModal
            open={false}
            toggleOpen={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </MuiDropDownWModal>
      ) : (
        ""
      )}
    </div>
  );
}
