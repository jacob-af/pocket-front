"use client";

import React, { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { AddRecipeToBookModal } from "./AddRecipeToBook";
import { EDIT_BOOK } from "@/graphql/mutations/recipeBook";
import { USER_BOOKS } from "@/graphql/queries/recipeBook";
import { alertList } from "@/graphql/reactiveVar/alert";
import { newBookInfo } from "@/graphql/reactiveVar/recipeBooks";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";

export const EditBookModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  const bookInfo = useReactiveVar(newBookInfo);
  const book = useReactiveVar(selectedRecipeBook);
  const alerts = useReactiveVar(alertList);
  const [editBook, feedback] = useMutation(EDIT_BOOK, {
    refetchQueries: [USER_BOOKS]
  });

  const closeModal = () => {
    newBookInfo({ name: "", description: "" });
    toggleopen();
  };

  const onChange = (event: any) => {
    console.log(event.target.id, event.target.value);
    newBookInfo({
      ...bookInfo,
      [event.target.id]: event.target.value
    });
  };

  const onClick = async () => {
    const { data } = await editBook({
      variables: {
        name: bookInfo.name,
        about: bookInfo.description,
        permission: book.permission,
        id: book.id
      }
    });
    alertList([
      ...alerts,
      {
        code: "success",
        message: `Book has been edited`
      }
    ]);
    selectedRecipeBook(data.updateRecipeBook);
    toggleopen();
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="w-80 rounded border border-black p-6 shadow-xl"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <h3 className="mb-4 text-lg font-semibold">
              Your Recipe Book must have a Unique Name
            </h3>

            {/* Input field */}
            <input
              onChange={(event: any) => onChange(event)}
              className="focus:shadow-outline bg-contrast mb-2 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
              id="name"
              placeholder="Recipe Book Name"
              value={bookInfo.name}
            />
            <textarea
              onChange={(event: any) => onChange(event)}
              className="focus:shadow-outline bg-contrast h-40 w-full appearance-none border px-3 py-2 text-left leading-tight text-gray-100 placeholder-gray-400 shadow focus:outline-none"
              id="description"
              placeholder="Description"
              value={bookInfo.description}
            />

            {/* Optional button to submit the form */}
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={onClick}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
