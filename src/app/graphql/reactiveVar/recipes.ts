import { Recipe, ListItem, BuildConstructor } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const blankTouch = (order: number) => {
  return {
    ingredientName: "",
    amount: 1,
    unit: "oz"
  };
};

export const touchArray = makeVar([blankTouch(0), blankTouch(1)]);

export const userRecipeList = makeVar<Recipe[]>([]);

export const selectedRecipe = makeVar<Recipe>({
  id: "",
  name: "",
  about: "",
  build: []
});
export const allRecipesList = makeVar<ListItem[]>([
  {
    id: "",
    name: ""
  }
]);
export const selectedRecipeId = makeVar<ListItem>({
  id: "",
  name: ""
});

export const newRecipeInfo = makeVar<BuildConstructor>({
  recipeName: "",
  buildName: "",
  about: "",
  instructions: "",
  glassware: "",
  ice: "",
  touchArray: [],
  newRecipe: false
});
