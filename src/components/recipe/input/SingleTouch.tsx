import {
  ingredientList,
  selectedIngredient
} from "@/graphql/reactiveVar/ingredients";
import {
  touchChange,
  touchIngredientChange
} from "@/components/recipe/recipeActions";

import { IngredientModal } from "@/components/modals/IngredientModal";
import { ListItem } from "@/__generated__/graphql";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { RemoveTouch } from "../../buttons/RemoveTouch";
import { touchArray } from "@/graphql/reactiveVar/recipes";
import { unitList } from "@/graphql/reactiveVar/unit";
import { useReactiveVar } from "@apollo/client";

export const SingleTouch = ({ index }: { index: number }) => {
  const touches = useReactiveVar(touchArray);
  const ingredients = useReactiveVar(ingredientList);
  const list = useReactiveVar(unitList);

  const onChange = (event: any) => {
    touchChange({ key: event.target.id, newValue: event.target.value, index });
  };

  return (
    <div className="bg-contrast box-border flex w-full items-center space-x-2 rounded-xl px-4 py-2">
      <input
        className="focus:shadow-outline bg-contrast w-10 flex-none text-center shadow"
        onChange={onChange}
        type="number"
        id="amount"
        step="0.25"
        value={touches[index].amount}
      />

      <select
        onChange={onChange}
        name="unit-options"
        className="focus:shadow-outline bg-contrast w-10 flex-none text-white"
        id="unit"
        value={touches[index].unit.abbreviation}
      >
        {list.map((unit, index) => (
          <option key={unit.abbreviation + index} value={unit.abbreviation}>
            {unit.abbreviation}
          </option>
        ))}
      </select>

      <div className="focus:shadow-outline align-center bg-contrast w-40 rounded-xl p-2 text-gray-100 shadow">
        <MuiDropDown
          options={ingredients as ListItem[]}
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

      <div className="w-12 flex-none text-center">
        {touches[index].ingredient
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(
              touches[index].ingredient.pricePerOunce * touches[index].amount
            )
          : ""}
      </div>

      <div className="w-5 flex-none">
        <RemoveTouch index={index} />
      </div>
    </div>
  );
};
