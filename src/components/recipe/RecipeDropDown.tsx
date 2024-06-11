"use client";

//import { recipeSelect } from "./recipeActions";
import { selectedRecipe, userRecipeList } from "@/graphql/reactiveVar/recipes";

import Dropdown from "../SharedComponents/Dropdown";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { Recipe } from "@/__generated__/graphql";
import levenshteinSortingAlgorithm from "@/components/SharedComponents/Levenshtein";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function RecipeDropDown({
  recipes,
  loading
}: {
  recipes: Recipe[];
  loading: string;
}) {
  const selected = useReactiveVar(selectedRecipe);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    userRecipeList(recipes);
  }, [recipes]);

  const recipeSelect = (newValue: ListItem) => {
    selectedRecipe(newValue as Recipe);
    if (session?.user) {
      router.push(`/db/recipe/${newValue.name}`);
    } else {
      router.push(`/recipe/${newValue.name}`);
    }
  };

  return (
    <div className="z-20 w-full">
      <Dropdown
        items={recipes as ListItem[]}
        selectedValue={selected as ListItem}
        sortingAlgorithm={(a, b) =>
          levenshteinSortingAlgorithm(a, b, selected.name)
        }
        onSelect={recipeSelect}
      />
    </div>
  );
}
