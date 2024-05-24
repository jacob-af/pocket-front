import React from "react";
import { ReactEventHandler } from "react";
import { fieldChange } from "@/components/recipe/recipeActions";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const RecipeAbout = () => {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    fieldChange({ key: event.target.id, newValue: event.target.value });
  };

  return (
    <div className="py-8">
      <div> Tell Us About this Build</div>
      <textarea
        onChange={(event: any) => onChange(event)}
        className="bg-contrast focus:shadow-outline h-40 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
        id="about"
        placeholder="About"
        value={recipeInfo.about || ""}
      />
    </div>
  );
};
