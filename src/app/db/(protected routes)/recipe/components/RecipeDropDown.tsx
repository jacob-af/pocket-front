"use client";

import { ListItem } from "@/types/util";
import MuiDropDown from "../../../components/MUIDropDown";
import { Recipe } from "@/__generated__/graphql";
import { recipeSelect } from "./recipeActions";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeDropDown({ recipes }: { recipes: Recipe[] }) {
  const selected = useReactiveVar(selectedRecipe);

  return (
    <div className="flex flex-col w-sm">
      <MuiDropDown
        options={recipes as ListItem[]}
        handleChange={recipeSelect}
        currentValue={(selected as ListItem) || { name: "", id: "Arbitrary" }}
        index={97}
      />
    </div>
  );
}
