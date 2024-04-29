import { TouchInput } from "@/__generated__/graphql";
import {
  allIngredientsList,
  selectedIngredientIds
} from "@/app/graphql/reactiveVar/ingredients";
import { ingredientChange, touchChange } from "../recipeHooks";
import { touchArray } from "@/app/graphql/reactiveVar/recipes";
import MuiDropDownWithModal from "./MUIDropDownWModal";
import { RemoveTouch } from "./RemoveTouch";
import { useReactiveVar } from "@apollo/client";
import { IngredientModal } from "./IngredientModal";

export const SingleTouch = ({
  touch,
  index
}: {
  touch: TouchInput;
  index: number;
}) => {
  const touches = useReactiveVar(touchArray);

  const onChange = (event: any) => {
    touchChange({ key: event.target.id, value: event.target.value, index });
  };

  return (
    <div className="w-lg grid grid-cols-12 my-2 p-0">
      <input
        className="col-span-2 bg-black shadow focus:shadow-outline text-gray-100 text-center"
        onChange={onChange}
        type="number"
        id="amount"
        step="0.25"
        value={touches[index].amount}
      />

      <select
        onChange={onChange}
        name="unit-options"
        className="col-span-3 bg-black px-4 text-white"
        id="unit"
        value={touches[index].unit}
      >
        <option value="ounces selected">Ounces</option>
        <option value="dashes">Dashes</option>
        <option value="drops">Drops</option>
        <option value="each">Each</option>
      </select>
      <div className="col-span-6 bg-black shadow focus:shadow-outline text-gray-100">
        <MuiDropDownWithModal
          list={allIngredientsList}
          handleChange={ingredientChange}
          index={index}
          currentValue={touches[index].ingredientName}
        >
          <IngredientModal
            open={false}
            toggleopen={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </MuiDropDownWithModal>
      </div>
      <div>
        <RemoveTouch index={index} />
      </div>
    </div>
  );
};
