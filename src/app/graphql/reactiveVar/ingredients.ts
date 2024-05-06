import { ListItem } from "@/types/util";
import { makeVar } from "@apollo/client";

export const ingredientList = makeVar([
  { id: "0", name: "loading", description: "loading" }
]);

export const allIngredientsList = makeVar<ListItem[]>([]);

export const selectedIngredient = makeVar<ListItem>({
  id: "",
  name: "",
  description: ""
});
