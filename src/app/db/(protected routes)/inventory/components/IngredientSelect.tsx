"use client";

import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import {
  allIngredientsList,
  selectedIngredient
} from "@/app/graphql/reactiveVar/ingredients";

import CheckIcon from "@mui/icons-material/Check";
import { Ingredient } from "@/__generated__/graphql";
import { ListItem } from "@/types/apollo";
import MuiDropDown from "../../recipe/(add-edit)/components/recipeInput/MUIDropDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ingredientChange } from "./ingredientHooks";
import sortByLevenshteinDistance from "../../../components/levenshteinSort";
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

  const [query, setQuery] = useState("");
  const filteredIngredients =
    query === "" ? ingredients : sortByLevenshteinDistance(ingredients, query);
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
