import RecipeLoader from "@/components/recipe/PublicRecipeLoader";

export default async function Dashboard({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen flex-col items-center overflow-hidden">
      <div className="bg-background mt-20 flex w-full max-w-2xl items-center justify-center">
        <RecipeLoader />
      </div>
      {children}
    </main>
  );
}
