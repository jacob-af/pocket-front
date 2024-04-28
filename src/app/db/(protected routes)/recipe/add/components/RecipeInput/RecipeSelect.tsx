import { allRecipesList } from "@/app/graphql/reactiveVar/recipes";
import { recipeChange } from "../recipeHooks";
import MuiDropDown from "../MUIDropDown";
import MuiDropDownWModal from "./MUIDropDownWModal";
import { AboutModal } from "./AboutModal";

export default function RecipeSelect() {
  return (
    <div className="flex flex-col items-center text-center">
      Select a recipe or create a new one?
      {allRecipesList.length > 0 ? (
        // <PropDown list={allRecipesList} handleChange={recipeChange} index={0} />
        // <MuiDropDown
        //   list={allRecipesList}
        //   handleChange={recipeChange}
        //   index={0}
        // />
        <MuiDropDownWModal
          list={allRecipesList}
          handleChange={recipeChange}
          index={0}
        >
          <AboutModal
            open={false}
            setOpen={function (value: boolean): void {
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
