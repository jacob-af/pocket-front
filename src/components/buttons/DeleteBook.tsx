"use client";

import { DeleteBookModal } from "@/components/modals/DeleteBookModal";
import { RecipeBook } from "@/__generated__/graphql";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export const DeleteBookButton = () => {
  const [openDelete, setOpenDelete] = useState(false);
  const book: RecipeBook = useReactiveVar(selectedRecipeBook);

  const handleDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="my-2 inline-block rounded bg-red-500 px-4 py-2 text-white"
      >
        Delete
      </button>
      <DeleteBookModal
        book={book}
        open={openDelete}
        toggleopen={setOpenDelete}
      />
    </>
  );
};
