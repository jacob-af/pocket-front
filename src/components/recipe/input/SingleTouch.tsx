import {
  allIngredientsList,
  selectedIngredient
} from "@/graphql/reactiveVar/ingredients";
import {
  touchChange,
  touchIngredientChange
} from "@/components/recipe/recipeActions";

import { IngredientModal } from "@/components/modals/IngredientModal";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { RemoveTouch } from "../../buttons/RemoveTouch";
import { Touch } from "@/__generated__/graphql";
import { touchArray } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const SingleTouch = ({
  touch,
  index
}: {
  touch: Touch;
  index: number;
}) => {
  const touches = useReactiveVar(touchArray);
  const allIngredients = useReactiveVar(allIngredientsList);

  const onChange = (event: any) => {
    touchChange({ key: event.target.id, newValue: event.target.value, index });
  };

  return (
    <div className="w-lg bg-contrast my-4 box-border grid grid-cols-12 rounded-xl px-4">
      <input
        className="focus:shadow-outline bg-contrast col-span-2 px-2 text-center shadow"
        onChange={onChange}
        type="number"
        id="amount"
        step="0.25"
        value={touches[index].amount}
      />

      <select
        onChange={onChange}
        name="unit-options"
        className="focus:shadow-outline bg-contrast col-span-3 text-white"
        id="unit"
        value={touches[index].unit}
      >
        <option value="ounces selected">Ounces</option>
        <option value="dashes">Dashes</option>
        <option value="drops">Drops</option>
        <option value="each">Each</option>
        <option value="ml">ml</option>
        <option value="cl">cl</option>
        <option value="g">grams</option>
      </select>
      {/* <div className="align-center flex justify-center"> */}
      <div className="focus:shadow-outline align center bg-contrast col-span-6 flex rounded-xl p-2 text-gray-100 shadow">
        <MuiDropDown
          options={allIngredients}
          handleChange={value => touchIngredientChange(value, index)}
          index={index}
          currentValue={{
            ...touches[index],
            id: touches[index].id,
            name: touches[index].ingredient.name
          }}
        >
          <IngredientModal
            open={false}
            toggleopen={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </MuiDropDown>
      </div>
      {/* </div> */}
      <div>
        <RemoveTouch index={index} />
      </div>
    </div>
  );
};
