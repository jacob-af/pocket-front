import { ChangeEvent, ChangeEventHandler } from "react";

import { fieldChange } from "@/app/components/recipe/recipeActions";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export const IngredientModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  // Function to close the modal
  const recipeInfo = useReactiveVar(newRecipeInfo);

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

            {/* Modal content */}
            <h3 className="text-lg text-primary bg-black font-semibold mb-4">
              We dont have that in our database, would you like to make a custom
              ingredient?
            </h3>

            {/* Input field */}
            <input
              onChange={onChange}
              className="bg-black shadow focus:shadow-outline px-3 py-2 border w-full text-gray-100 appearance-none focus:outline-none h-32 text-left text-top placeholder-gray-400 disabled:placeholder-gray-900
    disabled:text-gray-900 disabled:border-none"
              id="about"
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
    </div>
  );
};