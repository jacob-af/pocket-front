import LoadIngredients from "./components/IngredientLoader";
import { useReactiveVar } from "@apollo/client";

export default function ClientSideIngredients() {
  return (
    <div>
      <LoadIngredients />
    </div>
  );
}
