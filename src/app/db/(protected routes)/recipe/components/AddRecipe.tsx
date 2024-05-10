"use client";

import { useRouter } from "next/navigation";

function AddRecipe() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/db/recipe/add");
  };
  return (
    <button
      onClick={handleNavigate}
      className="border border-white rounded-full p-2 text-xs opacity-100 z-10 bg-slate-800"
    >
      Add
      <br />
      Recipe
    </button>
  );
}

export default AddRecipe;
