import { ChangeEvent, ChangeEventHandler } from "react";

import { fieldChange } from "@/components/recipe/recipeActions";

export const IngredientModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  const closeModal = () => {
    fieldChange({ key: "about", newValue: "" });
    toggleopen();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    fieldChange({ key: event.target.id, newValue: event.target.value });
  };

  const onClick = () => {
    toggleopen();
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="relative w-80 rounded bg-white p-6 shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-100 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <div className="text-primary bg-contrast mb-4 text-lg">
              We dont have that in our database, would you like to make a custom
              ingredient?
            </div>

            {/* Input field */}
            <input
              onChange={onChange}
              className="focus:shadow-outline text-top bg-contrast h-32 w-full appearance-none border px-3 py-2 text-left text-gray-100 placeholder-gray-400 shadow focus:outline-none disabled:border-none disabled:text-gray-900 disabled:placeholder-gray-900"
              id="about"
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
