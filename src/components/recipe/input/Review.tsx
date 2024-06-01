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
      <div className="float-right pl-6">
        <CocktailPicture
          url={!!recipeInfo.image ? recipeInfo.image : "/withcherry100.png"}
        />
      </div>
      <h2 className="text-lg font-semibold">{recipeInfo.name}</h2>
      <h2 className="text-lg font-semibold">{recipeInfo.buildName} Build</h2>
      <br />
      <p className="text-sm">{recipeInfo.about}</p>
      <br />
      <ul className="p-0">
        {touches.map((touch, index) => (
          <li key={`review${touch.id}`} className="py-1">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{touch.ingredient.name}</p>
                <p className="text-xs">{touch.unit.abbreviation}</p>
              </div>
              <p className="text-sm">{touch.amount}</p>
            </div>
          </li>
        ))}
        <li className="py-1">
          <div className="flex justify-between">
            <p>Glassware</p>
            <p className="font-bold">{recipeInfo.glassware}</p>
          </div>
        </li>
        <li className="py-1">
          <div className="flex justify-between">
            <p>Ice</p>
            <p className="font-bold">{recipeInfo.ice}</p>
          </div>
        </li>
        <li className="py-1">
          <p className="font-medium">Instructions</p>
          <p className="text-sm">{recipeInfo.instructions}</p>
        </li>
      </ul>
      <div>
        <label className="switch">
          <input type="checkbox" checked={isToggled} onChange={handleToggle} />
          <span className="slider"></span>
        </label>
        <p>Make Recipe {isToggled ? "Public" : "Private"}</p>
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">Total Cost</h2>
      </div>
    </div>
  );
}
