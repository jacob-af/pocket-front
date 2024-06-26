"use client";

import {
  selectedInventory,
  userInventoryList
} from "@/graphql/reactiveVar/inventory";

import Dropdown from "@/components/SharedComponents/Dropdown";
import { Inventory } from "@/__generated__/graphql";
import { ListItem } from "@/types/util";
import MuiDropDown from "@/components/SharedComponents/MUIDropDown";
import levenshteinSortingAlgorithm from "../SharedComponents/Levenshtein";
import { useEffect } from "react";
import { useReactiveVar } from "@apollo/client";

export default function InventoryDrop({
  inventories
}: {
  inventories: Inventory[];
}) {
  const list = useReactiveVar(userInventoryList);
  const selected = useReactiveVar(selectedInventory);

  useEffect(() => {
    userInventoryList(inventories as ListItem[]);
  }, [inventories]);

  const inventoryChange = (value: ListItem) => {
    selectedInventory(value);
  };

  return (
    <div className="flex w-80 flex-col items-center border-2 p-4">
      <Dropdown
        items={list}
        selectedValue={selected}
        sortingAlgorithm={(a, b) =>
          levenshteinSortingAlgorithm(a, b, selected.name)
        }
        onSelect={inventoryChange}
      />
    </div>
  );
}
