import RecipeDropDown from "./components/RecipeDropDown";
import RecipeSelector from "./components/RecipeSelector";

export default function Recipe() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <RecipeSelector />
      <RecipeDropDown />
    </div>
  );
}
