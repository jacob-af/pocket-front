import Link from "next/link";
import RecipeLoader from "@/components/recipe/PublicRecipeLoader";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden">
      <RecipeLoader />
      {children}
      <div className="bg-background fixed top-0 z-20 flex w-full justify-between p-2">
        <Link href="/welcome" className="p-2">
          Pocket
        </Link>
        <div className="flex space-x-4">
          <Link href="/signup" className="p-2">
            Sign Up
          </Link>
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
