import LoadIngredients from "@/components/ingredients/IngredientLoader";

export default function ClientSideIngredients() {
  return (
    <div className="min-w-sm m-20 box-border flex max-w-md flex-col items-center text-justify align-middle">
      <div>
        One day, all your inventory needs will be met on this page. For now,
        feel free to browse descriptions for over 700 ingredients.
      </div>
      <LoadIngredients />
    </div>
  );
}
