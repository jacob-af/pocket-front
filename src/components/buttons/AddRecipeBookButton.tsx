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
      <button onClick={toggleOpen} className="p-2 text-lg">
        New Recipe Book
      </button>
      <AddBookModal open={open} toggleopen={toggleOpen} />
    </div>
  );
}

export default AddRecipeBookButton;
