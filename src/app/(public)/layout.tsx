import { PublicNavBar } from "@/components/navigation/PublicNavBar";
import RecipeLoader from "@/components/recipe/PublicRecipeLoader";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden pt-12">
      <RecipeLoader />

      {children}
      <PublicNavBar />
    </main>
  );
}
