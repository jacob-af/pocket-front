import React from "react";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const ModalWrapper = ({
  open,
  toggleopen,
  children
}: {
  open: boolean;
  toggleopen: () => void;
  children: React.ReactNode;
}) => {
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="bg-contrast w-80 p-2 shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-100 hover:text-gray-800"
            >
              &times;
            </button>

            {children}

            <button
              className="float-right rounded bg-gray-500 px-4 py-2 text-white"
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
