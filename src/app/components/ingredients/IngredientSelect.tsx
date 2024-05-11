"use client";

import {
  allIngredientsList,
  selectedIngredient
} from "@/app/graphql/reactiveVar/ingredients";

import { Ingredient } from "@/__generated__/graphql";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/app/components/SharedComponents/MUIDropDown";
import { ingredientChange } from "./ingredientHooks";
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
    <div className="border-2 flex w-80">
      <MuiDropDown
        options={list}
        handleChange={ingredientChange}
        index={99}
        currentValue={selected}
      />
      {selected ? selected.description : ""}
    </div>
  );
}
