"use client";

import Dropdown from "@/components/SharedComponents/Dropdown";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { RecipeBook } from "@/__generated__/graphql";
import levenshteinSortingAlgorithm from "../SharedComponents/Levenshtein";
//import { recipeSelect } from "./recipeActions";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function RecipeBookDropDown({
  recipeBooks,
  loading
}: {
  recipeBooks: RecipeBook[];
  loading: string;
}) {
  const selected = useReactiveVar(selectedRecipeBook);
  const router = useRouter();

  const recipeBookSelect = (newValue: ListItem) => {
    console.log(newValue);
    selectedRecipeBook(newValue as RecipeBook);
    router.push(`/db/recipeBook/${newValue.name}`);
  };

  return (
    <div className="z-20 w-full">
      <Dropdown
        items={recipeBooks as ListItem[]}
        selectedValue={selected as ListItem}
        sortingAlgorithm={(a, b) =>
          levenshteinSortingAlgorithm(a, b, selected.name)
        }
        onSelect={recipeBookSelect}
      />
    </div>
  );
}
