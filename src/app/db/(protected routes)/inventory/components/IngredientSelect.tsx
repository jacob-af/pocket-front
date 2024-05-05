"use client";

import { Fragment, useEffect, useState } from "react";
import {
  allIngredientsList,
  selectedIngredient
} from "@/app/graphql/reactiveVar/ingredients";

import { Ingredient } from "@/__generated__/graphql";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/app/db/components/MUIDropDown";
import { ingredientChange } from "./ingredientHooks";
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
    <div className="fixed top-16 w-72">
      <MuiDropDown
        options={list}
        handleChange={ingredientChange}
        index={0}
        currentValue={selected}
      />
      {selected ? selected.description : ""}
    </div>
  );
}
