"use client";

import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Build, Recipe } from "@/__generated__/graphql";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [currentBuild, setBuild] = useState<Build>();
  return (
    <div className="top-16 w-72">
      {/* <Transition
        show="true"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0" 
      >*/}
      <div>{recipe.name}</div>
      <div>{recipe.about}</div>
      <ul>
        {recipe.build.map((build, index) => {
          return <li key={index}>{build.buildName}</li>;
        })}
      </ul>
      {/* </Transition> */}
    </div>
  );
}
