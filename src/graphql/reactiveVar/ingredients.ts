import { Ingredient } from "@/__generated__/graphql";
import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

export const ingredientList = makeVar<Ingredient[]>([
  { id: "0", name: "loading", description: "loading" }
]);

export const allIngredientsList = makeVar<ListItem[]>([]);

export const selectedIngredient = makeVar<ListItem>({
  id: uuidv4(),
  name: "",
  description: ""
});

export const inventoryChoice = makeVar<string>("all");
