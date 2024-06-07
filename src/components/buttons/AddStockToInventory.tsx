"use client";

import { AddStockModal } from "../modals/AddStockToInventory";
import LoadInventories from "../inventory/InventoryLoader";
import { useState } from "react";

function AddStockButton() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button onClick={toggleOpen} className="text-xs opacity-100">
        Add To
        <br />
        Inventory
      </button>
      <AddStockModal open={open} toggleopen={toggleOpen}></AddStockModal>
    </div>
  );
}

export default AddStockButton;
