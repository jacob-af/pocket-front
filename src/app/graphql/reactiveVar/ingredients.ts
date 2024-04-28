import { Ingredient, ListItem } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const ingredientList = makeVar([
  { id: "0", name: "loading", description: "loading" }
]);

export const allIngredientsList = makeVar<ListItem[]>([]);

export const selectedIngredientIds = makeVar<ListItem[]>([
  {
    id: "",
    name: ""
  },
  {
    id: "",
    name: ""
  }
]);
