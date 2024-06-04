import { BuildConstructor, Permission, Recipe } from "@/__generated__/graphql";

import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const blankTouch = (order: number) => {
  return {
    id: order.toString(),
    ingredient: { name: "", id: "'", pricePerOunce: 0 },
    amount: 1,

    unit: {
      id: "ed6dbf57-3ec2-4720-92ca-8d874f14fd3c",
      abbreviation: "oz"
    },
    order,
    cost: 0
  };
};

export const touchArray = makeVar([blankTouch(0), blankTouch(1)]);

export const userRecipeList = makeVar<Recipe[]>([]);

export const selectedRecipe = makeVar<Recipe>({
  id: uuidv4(),
  name: "",
  about: "",
  publicBuild: [],
  userBuild: []
});

export const allRecipesList = makeVar<ListItem[]>([
  {
    id: uuidv4(),
    name: ""
  }
]);

export const recipeBlank: BuildConstructor = {
  name: "",
  buildName: "",
  about: "",
  instructions: "",
  glassware: "",
  ice: "",
  image: "",
  isPublic: false,
  touchArray: [],
  recipe: { name: "" },
  newRecipe: false,
  id: uuidv4(),
  permission: Permission.View
};

export const currentBuild = makeVar(0);

export const newRecipeInfo = makeVar<BuildConstructor>(recipeBlank);
