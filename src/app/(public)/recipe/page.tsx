import Link from "next/link";
import { PublicRecipeBox } from "@/components/recipe/display/PublicRecipeBox";
import RecipeLoader from "@/components/recipe/PublicRecipeLoader";

export default function PublicRecipePage() {
  return (
    <div className="box-border grid h-full w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <PublicRecipeBox />
    </div>
  );
}
