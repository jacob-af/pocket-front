import { ReactiveVar, useReactiveVar } from "@apollo/client";

import { ListItem } from "@/types/util";
import { allIngredientsList } from "@/app/graphql/reactiveVar/ingredients";
import { selectedIngredient } from "@/app/graphql/reactiveVar/ingredients";

export type DropDownSelectFunction = ({ id, name }: ListItem) => void;

export const ingredientChange: DropDownSelectFunction = newValue => {
  console.log(newValue);
  selectedIngredient(newValue);
};
