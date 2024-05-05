import React from "react";
import { ReactEventHandler } from "react";
import { fieldChange } from "../../../components/recipeActions";

export const RecipeAbout = () => {
  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    fieldChange({ key: event.target.id, newValue: event.target.value });
  };

  return (
    <div className="py-8">
      <div> Tell Us About this Build</div>
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 "
        id="buildName"
        placeholder="About"
      />
    </div>
  );
};
