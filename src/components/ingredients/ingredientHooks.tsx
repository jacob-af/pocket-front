import { ListItem } from "@/types/util";
import { selectedIngredient } from "@/graphql/reactiveVar/ingredients";

export type DropDownSelectFunction = (
  { id, name }: ListItem,
  index?: number
) => void;

export const ingredientChange: DropDownSelectFunction = newValue => {
  console.log(newValue);
  selectedIngredient(newValue);
};
