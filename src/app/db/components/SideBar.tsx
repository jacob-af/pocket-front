import Link from "next/link";

export default async function SideBar() {
  return (
    <div className="container fixed top-0 left-0 h-full w-60 mt-12 border border-white">
      <div className="flex flex-col space-y-4 p-4">
        <Link href="/db" className="text-gray-100 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/db/recipe" className="text-gray-100 hover:text-blue-600">
          Recipes
        </Link>
        <Link
          href="/db/recipeBook"
          className="text-gray-100 hover:text-blue-600"
        >
          Recipe Book
        </Link>
        <Link
          href="/db/inventory"
          className="text-gray-100 hover:text-blue-600"
        >
          Inventory
        </Link>
        <Link href="/db/crew" className="text-gray-100 hover:text-blue-600">
          Crew
        </Link>
      </div>
    </div>
  );
}
