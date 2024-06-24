import { useLazyQuery, useReactiveVar } from "@apollo/client";

import AddStockButton from "@/components/buttons/AddStockToInventory";
import { COST_BUILD } from "@/graphql/queries/recipe";
import IngredientChoice from "../input/IngredientChoice";
import LoadInventories from "@/components/inventory/InventoryLoader";
import { inventoryChoice } from "@/graphql/reactiveVar/ingredients";
import { selectedInventory } from "@/graphql/reactiveVar/inventory";
import { useState } from "react";

export default function CostDisplay({ buildId }: { buildId: string }) {
  const inventoryId = useReactiveVar(inventoryChoice);

  const [cost, setCost] = useState(0);
  const [getCost, { error }] = useLazyQuery(COST_BUILD, {
    onCompleted: response => {
      console.log(response);
      setCost(response.costBuild.cost);
    },
    onError: err => {
      console.error("Error in query:", err);
    }
  });

  const handleClick = () => {
    console.log(buildId, "hello", inventoryId);
    getCost({ variables: { buildId, inventoryId } });
  };
  console.log(inventoryId);
  return (
    <div className="bg-contrast w-40 rounded-lg border-2 p-4">
      Select Inventory
      <IngredientChoice />
      {inventoryId !== "all" && (
        <>
          <button onClick={handleClick} className="rounded-lg border p-2">
            Run Cost
          </button>
          <br />
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(cost)}
        </>
      )}
      <br />
      {error?.message && `${error.message} is not in inventory`}
      {error?.message && (
        <AddStockButton message={error?.message ? error.message : ""} />
      )}
    </div>
  );
}
