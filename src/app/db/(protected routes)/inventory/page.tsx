import LoadIngredients from "@/components/ingredients/IngredientLoader";

export default function ClientSideIngredients() {
  return (
    <div className="flex flex-col items-center align-middle max-w-md min-w-sm m-20 box-border text-justify">
      <div>
        One day, all your inventory needs will be met on this page. For now,
        feel free to browse descriptions for over 700 ingredients.
      </div>
      <LoadIngredients />
    </div>
  );
}
