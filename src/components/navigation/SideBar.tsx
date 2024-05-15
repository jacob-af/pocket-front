import Link from "next/link";

export default async function SideBar() {
  return (
    <div className="z-90 border-box container fixed left-0 top-0 hidden h-full w-60 pt-12 lg:flex">
      <div className="mt-10 flex flex-col space-y-4 p-4">
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
        <Link href="/db/upload" className="text-gray-100 hover:text-blue-600">
          Upload
        </Link>
      </div>
    </div>
  );
}
