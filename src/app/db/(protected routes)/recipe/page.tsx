import RecipeCard from "./components/RecipeCard";
import RecipeDropDown from "./components/RecipeDropDown";
import RecipeLoader from "./components/RecipeLoader";
import Link from "next/link";

export default function Recipe() {
  return (
    <div className="min-h-screen flex flex-col content-center max-w-2xl">
      <RecipeDropDown />
      <RecipeCard />
      <RecipeLoader />
      <Link
        href="/db/recipe/add"
        className="btn-secondary inline-block bg-gray-500 text-white px-5 py-3 rounded hover:bg-gray-600 mr-4"
      >
        Add Recipe
      </Link>
    </div>
  );
}
