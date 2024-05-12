"use client";

import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { RecipeBook } from "@/__generated__/graphql";
//import { recipeSelect } from "./recipeActions";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function RecipeBookDropDown({
  recipeBooks
}: {
  recipeBooks: RecipeBook[];
}) {
  const selected = useReactiveVar(selectedRecipeBook);
  const router = useRouter();

  const recipeBookSelect = (newValue: ListItem) => {
    selectedRecipeBook(newValue as RecipeBook);
    console.log(newValue.name, "hitting rec selec");
    router.push(`/db/recipeBook/${newValue.name}`);
  };

  return (
    <div className="w-full">
      <MuiDropDown
        options={recipeBooks as ListItem[]}
        handleChange={recipeBookSelect}
        currentValue={(selected as ListItem) || { name: "", id: "Arbitrary" }}
        index={97}
      />
    </div>
  );
}
