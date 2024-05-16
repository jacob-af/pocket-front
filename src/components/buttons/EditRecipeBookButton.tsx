"use client";

import {
  newBookInfo,
  selectedRecipeBook
} from "@/graphql/reactiveVar/recipeBooks";

import { EditBookModal } from "@/components/modals/EditBookModal";
import { RecipeBook } from "@/__generated__/graphql";
import { useReactiveVar } from "@apollo/client";
import { useState } from "react";

export default function EditRecipeBookButton() {
  const book: RecipeBook = useReactiveVar(selectedRecipeBook);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    newBookInfo({
      name: book.name,
      description: book.description
    });
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="z-10 rounded-full border border-white bg-slate-800 p-2 text-xs opacity-100"
      >
        Add
        <br />
        Recipe Book
      </button>
      <EditBookModal open={open} toggleopen={toggleOpen} />
    </div>
  );
}
