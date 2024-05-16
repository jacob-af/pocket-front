import { Recipe, Touch, TouchInput } from "@/__generated__/graphql";
import {
  allRecipesList,
  blankTouch,
  newRecipeInfo,
  recipeBlank,
  selectedRecipe,
  touchArray
} from "@/graphql/reactiveVar/recipes";
import { usePathname, useRouter } from "next/navigation";

import { DropDownSelectFunction } from "@/components/ingredients/ingredientHooks";
import { ListItem } from "@/types/util";
import { redirect } from "next/navigation";

export const RecipeChange: DropDownSelectFunction = (newValue: ListItem) => {
  const pathname = usePathname();
  const router = useRouter();
  const recipeList = allRecipesList();
  const recipe = newRecipeInfo();

  if (recipeList.findIndex(a => a.name === newValue.name) === -1) {
    newRecipeInfo({
      ...recipe,
      name: newValue.name,
      buildName: "Original",
      newRecipe: true
    });
  } else if (newValue.name === "") {
    console.log("clear hit");
    newRecipeInfo(recipeBlank);
    router.push("/db/recipe/");
  } else {
    newRecipeInfo({
      ...recipe,
      name: newValue.name,
      buildName: "",
      newRecipe: false
    });
    if (pathname !== "/db/recipe/add") {
      router.push("/db/recipe/add");
    }
  }
};

export const recipeSelect: DropDownSelectFunction = (newValue: ListItem) => {
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

export const touchIngredientChange: DropDownSelectFunction = ({
  index,
  ...value
}: ListItem) => {
  const touches = touchArray();
  const newTouch = {
    ...touches[index],
    ingredientName: value.name
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
