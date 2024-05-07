import Link from "next/link";

export default async function SideBar() {
  return (
    <div className="container top-0 left-0 h-full w-60 pt-12 border-box  hidden lg:flex fixed">
      <div className="flex flex-col space-y-4 p-4 mt-10">
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
