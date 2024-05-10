import {
  allIngredientsList,
  selectedIngredient
} from "@/app/graphql/reactiveVar/ingredients";
import {
  touchChange,
  touchIngredientChange
} from "@/app/components/recipe/recipeActions";

import { IngredientModal } from "./IngredientModal";
import MuiDropDown from "@/app/db/components/MUIDropDown";
import { RemoveTouch } from "./RemoveTouch";
import { TouchInput } from "@/__generated__/graphql";
import { touchArray } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const SingleTouch = ({
  touch,
  index
}: {
  touch: TouchInput;
  index: number;
}) => {
  const touches = useReactiveVar(touchArray);
  const allIngredients = useReactiveVar(allIngredientsList);

  const onChange = (event: any) => {
    touchChange({ key: event.target.id, newValue: event.target.value, index });
  };

  return (
    <div className="w-lg grid grid-cols-12 my-4 p-0 h-18 border-4 box-border">
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
        <option value="ml">ml</option>
        <option value="cl">cl</option>
        <option value="g">grams</option>
      </select>
      <div className="col-span-6 bg-black shadow focus:shadow-outline text-gray-100">
        <MuiDropDown
          options={allIngredients}
          handleChange={value => touchIngredientChange(value, index)}
          index={index}
          currentValue={{
            ...touches[index],
            id: touches[index].id,
            name: touches[index].ingredientName
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
      <div>
        <RemoveTouch index={index} />
      </div>
    </div>
  );
};
