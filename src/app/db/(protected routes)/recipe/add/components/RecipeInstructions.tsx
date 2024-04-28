import * as React from "react";

import { useReactiveVar } from "@apollo/client";
import { fieldChange } from "./recipeHooks";

export default function BuildInstructions() {
  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    fieldChange({ key: event.target.id, value: event.target.value });
  };

  return (
    <div className="flex flex-col items-center min-w-xl">
      <div>learn to follow instructions</div>
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 m-4"
        id="instructions"
        placeholder="Instructions"
      />
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 m-4"
        id="glassware"
        placeholder="Glassware"
      />
      <input
        onChange={(event: any) => onChange(event)}
        className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 m-4"
        id="ice"
        placeholder="Ice"
      />
    </div>
  );
}
