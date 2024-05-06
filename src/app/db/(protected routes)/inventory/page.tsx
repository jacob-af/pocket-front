import LoadIngredients from "./components/IngredientLoader";

export default function ClientSideIngredients() {
  return (
    <div className="flex flex-col content-center align-middle max-w-md">
      <LoadIngredients />
    </div>
  );
}
