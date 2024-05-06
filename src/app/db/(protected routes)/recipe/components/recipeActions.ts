import { ADD_BUILD, ADD_RECIPE } from "@/app/graphql/mutations/recipes";
import {
  BuildConstructor,
  Recipe,
  Touch,
  TouchInput
} from "@/__generated__/graphql";
import { ReactiveVar, useReactiveVar } from "@apollo/client";
import {
  allRecipesList,
  blankTouch,
  newRecipeInfo,
  selectedRecipe,
  touchArray
} from "@/app/graphql/reactiveVar/recipes";

import { DropDownSelectFunction } from "../../inventory/components/ingredientHooks";
import { ListItem } from "@/types/util";
import { RECIPES_AND_INGREDIENTS } from "@/app/graphql/queries/recipe";
import router from "next/router";
import { useMutation } from "@apollo/client";

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
  newValue,
  index
}: {
  newValue: string;
  index: number;
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
  interface TouchFace {
    ingredientName: string;
    amount: number;
    unit: string;
    [key: string]: any; // Index signature to allow any property of type string
  }

  const touches: TouchFace[] = touchArray();
  let newTouch = { ...touches[index] };

  // Update the specified key with the new newValue
  if (key === "amount") {
    newTouch[key] = parseFloat(newValue);
  } else {
    newTouch[key] = newValue;
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
      //id: item.id,
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
