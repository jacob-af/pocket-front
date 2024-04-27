import { Recipe } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const userRecipeList = makeVar<Recipe[]>([]);
export const selectedRecipe = makeVar<Recipe>({
  id: "",
  name: "",
  build: [],
  about: ""
  // Add default values for other properties as needed
});
