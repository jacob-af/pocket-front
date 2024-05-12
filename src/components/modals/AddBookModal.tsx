"use client";

import React, { useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { AddRecipeToBookModal } from "./AddRecipeToBook";
import { CREATE_BOOK } from "@/graphql/mutations/recipeBook";
import { USER_RECIPEBOOKS } from "@/graphql/queries/recipeBook";
import { alertList } from "@/graphql/reactiveVar/alert";
import { newBookInfo } from "@/graphql/reactiveVar/recipeBooks";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";

export const AddBookModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  const bookInfo = useReactiveVar(newBookInfo);
  const alerts = useReactiveVar(alertList);
  const [createBook, feedback] = useMutation(CREATE_BOOK, {
    refetchQueries: [USER_RECIPEBOOKS]
  });

  const [openInner, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!openInner);
  };

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
    const { data } = await createBook({
      variables: bookInfo
    });
    alertList([
      ...alerts,
      {
        code: "success",
        message: `Book has been created`
      }
    ]);
    console.log(data);
    selectedRecipeBook(data.createRecipeBook);
    toggle();
    toggleopen();
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="p-6 rounded border border-black shadow-xl w-80"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <h3 className="text-lg font-semibold mb-4">
              Your Recipe Book must have a Unique Name
            </h3>

            {/* Input field */}
            <input
              onChange={(event: any) => onChange(event)}
              className="bg-black shadow focus:shadow-outline px-3 py-2 mb-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 "
              id="name"
              placeholder="Recipe Book Name"
              value={bookInfo.name}
            />
            <textarea
              onChange={(event: any) => onChange(event)}
              className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400 h-40"
              id="description"
              placeholder="Description"
              value={bookInfo.description}
            />

            {/* Optional button to submit the form */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={onClick}
            >
              Okay
            </button>
          </div>
        </div>
      )}
      <div>
        <AddRecipeToBookModal open={openInner} toggleopen={toggle} />
      </div>
    </div>
  );
};
