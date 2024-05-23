"use client";

//import { recipeSelect } from "./recipeActions";
import { selectedRecipe, userRecipeList } from "@/graphql/reactiveVar/recipes";

import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import { Recipe } from "@/__generated__/graphql";
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
    console.log(newValue.name, "hitting rec selec");
    if (session?.user) {
      router.push(`/db/recipe/${newValue.name}`);
    } else {
      router.push(`/recipe/${newValue.name}`);
    }
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
