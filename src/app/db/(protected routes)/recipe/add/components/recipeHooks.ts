import { ListItem, BuildConstructor } from "@/__generated__/graphql";
import { ReactiveVar } from "@apollo/client";
import {
  newRecipeInfo,
  allRecipesList,
  touchArray,
  blankTouch
} from "@/app/graphql/reactiveVar/recipes";
import { useMutation } from "@apollo/client";

export type RecipeChangeFunction = (value: string) => void;

export const recipeChange: RecipeChangeFunction = (value: string) => {
  const recipeList = allRecipesList();
  const recipe = newRecipeInfo();
  if (recipeList.findIndex(a => a.name === value) === -1) {
    newRecipeInfo({
      ...recipe,
      recipeName: value,
      buildName: "Original",
      newRecipe: true
    });
  } else {
    newRecipeInfo({
      ...recipe,
      recipeName: value,
      buildName: "",
      newRecipe: false
    });
  }
};

export type FieldChangeFunction = ({
  key,
  value
}: {
  key: string;
  value: string;
}) => void;

export const fieldChange: FieldChangeFunction = ({ key, value }) => {
  const recipeInfo = newRecipeInfo();
  newRecipeInfo({ ...recipeInfo, [key]: value });
};

export type IngredientChangeFunction = (value: string, index: number) => void;

export const ingredientChange: IngredientChangeFunction = (
  value: string,
  index: number
) => {
  const touches = touchArray();
  const newTouch = {
    ...touches[index],
    ingredientName: value
  };
  const newTouches = touches;
  newTouches.splice(index, 1, newTouch);
  touchArray([...newTouches]);
};

export type TouchChangeFunction = ({
  key,
  value,
  index
}: {
  [key: string]: any;
  value: any;
  index: number;
}) => void;

export const touchChange: TouchChangeFunction = ({ key, value, index }) => {
  interface TouchFace {
    ingredientName: string;
    amount: number;
    unit: string;
    [key: string]: any; // Index signature to allow any property of type string
  }

  const touches: TouchFace[] = touchArray();
  let newTouch = { ...touches[index] };

  // Update the specified key with the new value
  if (key === "amount") {
    newTouch[key] = parseFloat(value);
  } else {
    newTouch[key] = value;
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
