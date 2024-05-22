import { BuildConstructor, Permission, Recipe } from "@/__generated__/graphql";

import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const blankTouch = (order: number) => {
  return {
    id: order.toString(),
    ingredient: { name: "", id: "'" },
    amount: 1,
    unit: "oz",
    order
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
  isPublic: false,
  touchArray: [],
  newRecipe: false,
  id: uuidv4(),
  permission: Permission.View
};

export const currentBuild = makeVar(0);

export const newRecipeInfo = makeVar<BuildConstructor>(recipeBlank);
