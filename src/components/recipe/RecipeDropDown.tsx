"use client";

import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { Recipe } from "@/__generated__/graphql";
//import { recipeSelect } from "./recipeActions";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function RecipeDropDown({
  recipes,
  loading
}: {
  recipes: Recipe[];
  loading: string;
}) {
  const selected = useReactiveVar(selectedRecipe);
  const router = useRouter();

  const recipeSelect = (newValue: ListItem) => {
    selectedRecipe(newValue as Recipe);
    console.log(newValue.name, "hitting rec selec");
    router.push(`/db/recipe/${newValue.name}`);
  };

  return (
    <div className="z-20 w-full">
      <MuiDropDown
        options={recipes as ListItem[]}
        handleChange={recipeSelect}
        currentValue={
          selected.name !== ""
            ? (selected as ListItem)
            : { name: loading, id: "Arbitrary" }
        }
        index={97}
      />
    </div>
  );
}
