import { useReactiveVar } from "@apollo/client";
import LoadIngredients from "./components/IngredientSelector";

export default function ClientSideIngredients() {
  return (
    <div>
      <LoadIngredients />
    </div>
  );
}
