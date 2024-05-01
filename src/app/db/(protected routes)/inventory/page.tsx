import { useReactiveVar } from "@apollo/client";
import LoadIngredients from "./components/IngredientSelector";
import { authTokens } from "@/app/graphql/reactiveVar/authTokens";

export default function ClientSideIngredients() {
  return (
    <div>
      <LoadIngredients />
    </div>
  );
}
