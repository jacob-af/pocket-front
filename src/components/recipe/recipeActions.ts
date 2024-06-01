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

import { DropDownSelectFunction } from "@/components/ingredients/ingredientActions";
import { ListItem } from "@/types/util";
import { redirect } from "next/navigation";
import { useCallback } from "react";

export const useRecipeChange = (): DropDownSelectFunction => {
  const pathname = usePathname();
  const router = useRouter();
  const recipeList = allRecipesList();

  return useCallback(
    (newValue: ListItem) => {
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
        if (pathname !== "/db/addRecipe") {
          router.push("/db/addRecipe");
        }
      }
    },
    [pathname, router, recipeList]
  );
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
    ingredient: { id: value.id, name: value.name }
  };
  const newTouches = [...touches];
  newTouches.splice(index, 1, newTouch);
  console.log(newTouches);
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
  const touches = touchArray();
  let newTouch = { ...touches[index] };

  // Update the specified key with the new newValue
  if (key === "amount") {
    newTouch["amount"] = parseFloat(newValue);
  } else if (key === "unit") {
    newTouch["unit"].abbreviation = newValue;
  }

  touches[index] = newTouch;
  console.log(touches);
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
