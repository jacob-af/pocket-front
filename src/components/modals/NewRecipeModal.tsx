import React from "react";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const AboutModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  // Function to close the modal
  const recipeInfo = useReactiveVar(newRecipeInfo);

  const closeModal = () => {
    toggleopen();
  };

  const onClick = () => {
    toggleopen();
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-80"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-100 hover:text-gray-800"
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-4">
              You are creating a new RECIPE called: {`${recipeInfo.name}`}
            </h3>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
