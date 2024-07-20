import AddRecipe from "../buttons/AddRecipeButton";
import { BuildEditPopout } from "../modals/BuildEditPopout";
import { EditRecipeButton } from "../buttons/EditRecipe";
import { useSession } from "next-auth/react";

const RecipeListOptions = () => {
  const { data: session } = useSession();

  return (
    <div>
      <AddRecipe />
    </div>
  );
};

export default RecipeListOptions;
