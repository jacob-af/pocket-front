import { newRecipeInfo, touchArray } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function Review() {
  const recipeInfo = useReactiveVar(newRecipeInfo);
  const touches = useReactiveVar(touchArray);

  return (
    <div>
      <h2 className="text-lg font-semibold">{recipeInfo.recipeName}</h2>
      <h2 className="text-lg font-semibold">{recipeInfo.buildName}</h2>
      <p className="text-sm">{recipeInfo.about}</p>

      <ul className="p-0">
        {touches.map((touch, index) => (
          <li key={`review${index}`} className="py-1">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{touch.ingredientName}</p>
                <p className="text-xs">{touch.unit}</p>
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

      <div className="mt-2">
        <h2 className="text-lg font-semibold">Total Cost</h2>
      </div>
    </div>
  );
}
