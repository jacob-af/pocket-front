import { Ingredient } from "@/__generated__/graphql";
import { makeVar, ReactiveVar } from "@apollo/client";

export const ingredientList = makeVar([
  { id: "0", name: "loading", description: "loading" }
]);
