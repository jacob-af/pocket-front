"use client";

import {
  allIngredientsList,
  selectedIngredient
} from "@/graphql/reactiveVar/ingredients";

import { Ingredient } from "@/__generated__/graphql";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { ingredientChange } from "./ingredientActions";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";

export default function IngredientDrop({
  ingredients
}: {
  ingredients: Ingredient[];
}) {
  const list = useReactiveVar(allIngredientsList);
  const selected = useReactiveVar(selectedIngredient);

  useEffect(() => {
    allIngredientsList(ingredients as ListItem[]);
  }, [ingredients]);

  return (
    <div className="flex w-80 flex-col items-center border-2 p-4">
      <MuiDropDown
        options={list}
        handleChange={ingredientChange}
        index={99}
        currentValue={selected}
      />
    </div>
  );
}
