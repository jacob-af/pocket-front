"use client";

import { Build, Recipe } from "@/__generated__/graphql";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  selectedRecipe,
  userRecipeList
} from "@/app/graphql/reactiveVar/recipes";

import CheckIcon from "@mui/icons-material/Check";
import { ListItem } from "@/types/apollo";
import MuiDropDown from "../../../components/MUIDropDown";
import { recipeSelect } from "./recipeActions";
import { useReactiveVar } from "@apollo/client";

export default function RecipeDropDown({ recipes }: { recipes: Recipe[] }) {
  //const recipes: Recipe[] = useReactiveVar(userRecipeList);
  const selected = useReactiveVar(selectedRecipe);
  // const [selected, setSelected] = useState<Recipe>(recipes[0]);
  console.log(recipes.slice(0, 5));

  return (
    <div className="flex flex-col w-sm">
      <MuiDropDown
        options={recipes as ListItem[]}
        handleChange={recipeSelect}
        currentValue={(selected as ListItem) || { name: "", id: "" }}
        index={0}
      />
    </div>
  );
}
