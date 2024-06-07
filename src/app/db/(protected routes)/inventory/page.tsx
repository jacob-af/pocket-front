import AddStockButton from "@/components/buttons/AddStockToInventory";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import LoadIngredients from "@/components/ingredients/IngredientLoader";
import LoadInventories from "@/components/inventory/InventoryLoader";

export default function ClientSideIngredients() {
  return (
    <div className="m-20 box-border flex w-full max-w-2xl flex-col items-center text-justify align-middle">
      <LoadInventories />
      <AddStockButton />
      <InventoryTable />
    </div>
  );
}
