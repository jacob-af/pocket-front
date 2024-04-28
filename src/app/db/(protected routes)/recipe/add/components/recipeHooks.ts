import { ListItem, BuildConstructor } from "@/__generated__/graphql";
import { ReactiveVar } from "@apollo/client";
import {
  newRecipeInfo,
  allRecipesList,
  touchArray,
  blankTouch
} from "@/app/graphql/reactiveVar/recipes";

export type RecipeChangeFunction = (value: string) => void;

export const recipeChange: RecipeChangeFunction = (value: string) => {
  const recipeList = allRecipesList();
  const recipe = newRecipeInfo();
  console.log(value);
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
  console.log(recipe);
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
  console.log(newTouches);
  touchArray([...newTouches]);
};

export type TouchChangeFunction = ({
  key,
  value,
  index
}: {
  key: string;
  value: string;
  index: number;
}) => void;

export const touchChange: TouchChangeFunction = ({ key, value, index }) => {
  console.log(key, value);
  const touches = touchArray();
  const newTouch = {
    ...touches[index],
    [key]: value
  };
  const newTouches = touches;
  newTouches.splice(index, 1, newTouch);
  console.log(newTouches);
  touchArray([...newTouches]);
};

export const removeTouch = (index: number) => {
  const touches = touchArray();
  touches.splice(index, 1);
  console.log(touches);
  touchArray([...touches]);
};

export const addTouch = () => {
  const touches = touchArray();
  const rec = [...touches, blankTouch(touches.length)];
  touchArray(rec);
};
