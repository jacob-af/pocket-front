import FavoriteDisplay from "../../components/db/FavoriteDisplay";
import LandingModal from "@/components/modals/LandingModal";
import RecipeBookLoader from "@/components/recipeBook/RecipeBookLoader";

export default async function Landing() {
  return (
    <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center">
      <LandingModal />
      <div className="relative z-10 flex w-full flex-row items-center justify-center">
        <RecipeBookLoader />
      </div>
      <FavoriteDisplay />
    </div>
  );
}
