import AddRecipe from "@/components/buttons/AddRecipeButton";
import { RecipeBox } from "@/components/recipe/display/UserRecipeBox";
import RecipeLoader from "@/components/recipe/UserRecipeLoader";

export default async function RecipePage() {
  return (
    <>
      <div className="fixed right-2 top-12 z-40">
        <AddRecipe />
      </div>

      <RecipeBox />
    </>
  );
}
