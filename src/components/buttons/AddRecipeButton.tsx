"use client";

import { useRouter } from "next/navigation";

function AddRecipe() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/db/addRecipe");
  };
  return (
    <button onClick={handleNavigate} className="p-2 text-xs opacity-100">
      Add
      <br />
      Recipe
    </button>
  );
}

export default AddRecipe;
