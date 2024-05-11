import { BuildConstructor, Permission, Recipe } from "@/__generated__/graphql";

import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const blankTouch = (order: number) => {
  return {
    id: order.toString(),
    ingredientName: "",
    amount: 1,
    unit: "oz"
  };
};

export const touchArray = makeVar([blankTouch(0), blankTouch(1)]);

export const userRecipeList = makeVar<Recipe[]>([]);

export const selectedRecipe = makeVar<Recipe>({
  id: uuidv4(),
  name: "",
  about: "",
  build: [],
  userBuild: []
});

export const allRecipesList = makeVar<ListItem[]>([
  {
    id: uuidv4(),
    name: ""
  }
]);

export const recipeBlank = {
  name: "",
  buildName: "",
  about: "",
  instructions: "",
  glassware: "",
  ice: "",
  touchArray: [],
  newRecipe: false,
  id: uuidv4(),
  permission: Permission.View
};

export const newRecipeInfo = makeVar<BuildConstructor>(recipeBlank);
