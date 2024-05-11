"use client";

import { useRouter } from "next/navigation";

function AddRecipeBookButton() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/db/recipeBook/add");
  };
  return (
    <button
      onClick={handleNavigate}
      className="border border-white rounded-full p-2 text-xs opacity-100 z-10 bg-slate-800"
    >
      Add
      <br />
      Recipe Book
    </button>
  );
}

export default AddRecipeBookButton;
