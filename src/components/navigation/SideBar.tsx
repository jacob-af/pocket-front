import Link from "next/link";

export default async function SideBar() {
  return (
    <div className="bg-background container fixed left-0 top-0 mt-12 box-border hidden h-full w-60 lg:flex">
      <div className="mt-10 flex flex-col space-y-4 p-4">
        <Link href="/db" className="hover:text-gray-600">
          Dashboard
        </Link>
        <Link href="/db/recipe" className="hover:text-gray-600">
          Recipes
        </Link>
        <Link href="/db/recipeBook" className="hover:text-gray-600">
          Recipe Book
        </Link>
        <Link href="/db/inventory" className="hover:text-gray-600">
          Inventory
        </Link>
        <Link href="/db/crew" className="hover:text-gray-600">
          Crew
        </Link>
        <Link href="/db/upload" className="hover:text-gray-600">
          Upload
        </Link>
      </div>
    </div>
  );
}
