import AddRecipe from "../buttons/AddRecipeButton";
import { BuildEditPopout } from "../modals/BuildEditPopout";
import { EditRecipeButton } from "../buttons/EditRecipe";
import { useSession } from "next-auth/react";

const RecipeOptions = () => {
  const { data: session } = useSession();

  return <div>Edit Recipe</div>;
};

export default RecipeOptions;
