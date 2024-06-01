import {
  CocktailPicture,
  SmallCocktailPicture
} from "@/components/images/CocktailPicture";
import { newRecipeInfo, touchArray } from "@/graphql/reactiveVar/recipes";

import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export default function Review() {
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const touches = useReactiveVar(touchArray);
  const [isToggled, setIsToggled] = useState(recipeInfo.isPublic ?? false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    newRecipeInfo({
      ...recipeInfo,
      isPublic: !isToggled
    });
  };

  return (
    <div>
      <div>
        <div className="float-right hidden pl-6 md:block">
          <CocktailPicture
            url={!!recipeInfo.image ? recipeInfo.image : "/withcherry100.png"}
          />
        </div>
        <div className="float-right pl-6 md:hidden">
          <SmallCocktailPicture
            url={!!recipeInfo.image ? recipeInfo.image : "/withcherry100.png"}
          />
        </div>
        <h2 className="text-lg font-semibold">{recipeInfo.name}</h2>
        <h2 className="text-lg font-semibold">{recipeInfo.buildName} Build</h2>
        <br />
        <p className="text-sm">{recipeInfo.about}</p>
        <br />
      </div>
      <br />
      <ul className="p-0">
        {touches.map((touch, index) => (
          <li key={`review${touch.id}`} className="py-1">
            <div className="grid grid-cols-4">
              <p className="col-span-1 text-right text-lg">{touch.amount}</p>
              <p className="col-span-1 text-center">
                {touch.unit.abbreviation}
              </p>
              <p className="col-span-2 text-left text-lg">
                {touch.ingredient.name}
              </p>
            </div>
          </li>
        ))}
        <li className="grid grid-cols-2 gap-x-4 py-1">
          <p className="grid-cols-1 text-right">Glassware</p>
          <p className="grid-cols-1 font-bold">{recipeInfo.glassware}</p>
          <p className="grid-cols-1 text-right">Ice</p>
          <p className="grid-cols-1 font-bold">{recipeInfo.ice}</p>
        </li>
        <li className="py-1">
          <p className="font-bold">Instructions</p>
          <p className="text-sm">{recipeInfo.instructions}</p>
        </li>
      </ul>
      <div className="flex">
        <label className="switch">
          <input type="checkbox" checked={isToggled} onChange={handleToggle} />
          <span className=""></span>
        </label>
        <p>Make Recipe {isToggled ? "Public" : "Private"}</p>
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">Total Cost</h2>
      </div>
    </div>
  );
}
