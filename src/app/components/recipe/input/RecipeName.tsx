import { ReactEventHandler } from "react";
import { fieldChange } from "@/app/components/recipe/recipeActions";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const RecipeName = () => {
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    fieldChange({ key: event.target.id, newValue: event.target.value });
  };

  return (
    <div className="py-8">
      <div> Change the name of this Recipe:</div>
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 "
        id="recipeName"
        placeholder="Recipe Name"
        value={recipeInfo.name}
      />
    </div>
  );
};
