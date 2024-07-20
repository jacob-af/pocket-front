"use client";

import { ALL_INGREDIENTS, STOCK_LIST } from "@/graphql/queries/ingredient";
import { Ingredient, Inventory } from "@/__generated__/graphql";
import {
  ingredientList,
  inventoryChoice
} from "@/graphql/reactiveVar/ingredients";
import { useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";

import { ChangeEvent } from "react";
import { USER_INVENTORIES } from "@/graphql/queries/inventory";
import { selectedInventory } from "@/graphql/reactiveVar/inventory";

export default function IngredientChoice() {
  const inventory = useReactiveVar(selectedInventory);
  const choice = useReactiveVar(inventoryChoice);
  const { data } = useQuery(USER_INVENTORIES);
  const [fetchAllIngredients, { error: allError }] = useLazyQuery(
    ALL_INGREDIENTS,
    {
      onCompleted: (response: { ingredients: Ingredient[] }) => {
        console.log(response);
        ingredientList(response.ingredients);
      }
    }
  );
  const [fetchStockIngredients, { error: stockError }] = useLazyQuery(
    STOCK_LIST,
    {
      onCompleted: (response: { stockList: Ingredient[] }) => {
        console.log(response);
        ingredientList(response.stockList);
      }
    }
  );

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    inventoryChoice(event.target.value);
    if (event.target.value === "all") {
      fetchAllIngredients();
    } else {
      fetchStockIngredients({
        variables: { inventoryId: event.target.value }
      });
    }
  };

  return (
    <select
      onChange={onChange}
      name="unit-options"
      className="focus:shadow-outline bg-contrast col-span-3 text-white"
      id="unit"
      value={choice}
    >
      <option value="all">All Ingredients</option>
      {data &&
        data?.userInventory.map((inventory: Inventory) => {
          return (
            <option key={inventory.id} value={inventory.id}>
              {inventory.name}
            </option>
          );
        })}
    </select>
  );
}
