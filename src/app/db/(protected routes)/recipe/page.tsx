import AddRecipe from "@/components/buttons/AddRecipeButton";
import { RecipeBox } from "@/components/recipe/display/UserRecipeBox";
import RecipeLoader from "@/components/recipe/UserRecipeLoader";

export default async function RecipePage() {
  return (
    <>
      <div className="bg-background mt-20 flex w-full max-w-2xl items-center justify-center">
        <RecipeLoader />
      </div>
      <div className="fixed right-2 top-12 z-40">
        <AddRecipe />
      </div>
      <>
        {/* AddRecipe button */}
        <RecipeBox />
        {/* Map over the configurations for column sizes */}
      </>
    </>
  );
}
