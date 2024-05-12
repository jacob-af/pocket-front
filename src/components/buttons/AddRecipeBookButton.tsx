"use client";

import { AddBookModal } from "../modals/AddBookModal";
import { useState } from "react";

function AddRecipeBookButton() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="border border-white rounded-full p-2 text-xs opacity-100 z-10 bg-slate-800"
      >
        Add
        <br />
        Recipe Book
      </button>
      <AddBookModal open={open} toggleopen={toggleOpen} />
    </div>
  );
}

export default AddRecipeBookButton;
