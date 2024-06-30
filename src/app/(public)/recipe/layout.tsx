import Link from "next/link";
import RecipeLoader from "@/components/recipe/PublicRecipeLoader";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center pt-24">
      <RecipeLoader />
      {children}
    </main>
  );
}
