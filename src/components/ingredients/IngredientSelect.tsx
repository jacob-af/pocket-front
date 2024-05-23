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
    <div className="border-2 flex flex-col w-80 p-4 items-center">
      <MuiDropDown
        options={list}
        handleChange={ingredientChange}
        index={99}
        currentValue={selected}
      />
      <div className="pt-2">{selected ? selected.description : ""}</div>
    </div>
  );
}
