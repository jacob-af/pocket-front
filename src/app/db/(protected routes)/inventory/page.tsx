import LoadIngredients from "@/app/components/ingredients/IngredientLoader";

export default function ClientSideIngredients() {
  return (
    <div className="flex flex-col content-center align-middle max-w-md min-w-sm m-20 box-border">
      <LoadIngredients />
    </div>
  );
}
