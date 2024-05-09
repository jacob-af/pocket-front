import { Recipe, Touch, TouchInput } from "@/__generated__/graphql";
import {
  allRecipesList,
  blankTouch,
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/app/graphql/reactiveVar/recipes";

import { DropDownSelectFunction } from "../../inventory/components/ingredientHooks";
import { ListItem } from "@/types/util";
import { redirect } from "next/navigation";

export const recipeChange: DropDownSelectFunction = (newValue: ListItem) => {
  const recipeList = allRecipesList();
  const recipe = newRecipeInfo();
  if (recipeList.findIndex(a => a.name === newValue.name) === -1) {
    newRecipeInfo({
      ...recipe,
      name: newValue.name,
      buildName: "Original",
      newRecipe: true
    });
  } else {
    newRecipeInfo({
      ...recipe,
      name: newValue.name,
      buildName: "",
      newRecipe: false
    });
  }
};

export const recipeSelect: DropDownSelectFunction = newValue => {
  selectedRecipe(newValue as Recipe);
  console.log(newValue.name, "hitting rec selec");
  redirect(`/db/recipe/${newValue.name}`);
};

export type FieldChangeFunction = ({
  key,
  newValue
}: {
  key: string;
  newValue: string;
}) => void;

export const fieldChange: FieldChangeFunction = ({ key, newValue }) => {
  const recipeInfo = newRecipeInfo();
  newRecipeInfo({ ...recipeInfo, [key]: newValue });
};

export type IngredientChangeFunction = ({
  index,
  newValue
}: {
  index: number;
  newValue: string;
}) => void;

export const touchIngredientChange: DropDownSelectFunction = ({
  name,
  index
}) => {
  const touches = touchArray();
  const newTouch = {
    ...touches[index],
    ingredientName: name
  };
  const newTouches = touches;
  newTouches.splice(index, 1, newTouch);
  touchArray([...newTouches]);
};

export type TouchChangeFunction = ({
  key,
  newValue,
  index
}: {
  [key: string]: any;
  newValue: any;
  index: number;
}) => void;

export const touchChange: TouchChangeFunction = ({ key, newValue, index }) => {
  const touches: TouchInput[] = touchArray();
  let newTouch = { ...touches[index] };

  // Update the specified key with the new newValue
  if (key === "amount") {
    newTouch["amount"] = parseFloat(newValue);
  } else if (key === "unit") {
    newTouch["unit"] = newValue;
  }

  touches[index] = newTouch;
  touchArray([...touches]);
};

export const removeTouch = (index: number) => {
  const touches = touchArray();
  touches.splice(index, 1);
  touchArray([...touches]);
};

export const addTouch = () => {
  const touches = touchArray();
  const rec = [...touches, blankTouch(touches.length)];
  touchArray(rec);
};

export function convertArrayByOrder(inputArray: Touch[]) {
  // Create an empty array to hold the output
  const outputArray: TouchInput[] = [];

  // Loop through each object in the input array
  inputArray.forEach(item => {
    // Create a new object with the desired properties
    const newItem = {
      id: item.id,
      ingredientName: item.ingredient.name,
      amount: item.amount,
      unit: item.unit
      //order: item.order
    };

    // Place the new object in the output array at the index specified by the order property
    outputArray[item.order] = newItem;
  });
  console.log(outputArray);
  return outputArray;
}
