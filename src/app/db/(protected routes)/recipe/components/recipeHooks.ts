import { ListItem, BuildConstructor } from "@/__generated__/graphql";
import { ReactiveVar } from "@apollo/client";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";

export type RecipeChangeFunction = (
  value: string,
  recipeList: ListItem[]
) => void;

export const recipeChange: RecipeChangeFunction = (
  value: string,
  recipeList: ListItem[]
) => {
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
