import { touchArray } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export function ShowCost() {
  // needs unit conversion to be complete.

  const touches = useReactiveVar(touchArray);

  const total = touches.reduce((acc, touch) => {
    return acc + touch.ingredient.pricePerOunce * touch.amount;
  }, 0);

  return (
    <div>
      Total Cost:{" "}
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(total)}
    </div>
  );
}
