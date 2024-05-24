import * as React from "react";

import { fieldChange } from "@/components/recipe/recipeActions";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function BuildInstructions() {
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    fieldChange({ key: event.target.id, newValue: event.target.value });
  };

  return (
    <div className="min-w-xl flex flex-col items-center">
      <textarea
        onChange={(event: any) => onChange(event)}
        className="bg-contrast focus:shadow-outline m-4 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
        id="instructions"
        placeholder="Instructions"
        value={recipeInfo.instructions || ""}
        rows={5}
      ></textarea>
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-contrast focus:shadow-outline m-4 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
        id="glassware"
        value={recipeInfo.glassware || ""}
        placeholder="Glassware"
      />
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-contrast focus:shadow-outline m-4 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
        id="ice"
        placeholder="Ice"
        value={recipeInfo.ice || ""}
      />
    </div>
  );
}
