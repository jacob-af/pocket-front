import { ChangeEvent, ChangeEventHandler } from "react";
import { fieldChange } from "../recipeHooks";
import { newRecipeInfo } from "@/app/graphql/reactiveVar/recipes";
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
    fieldChange({ key: "about", value: "" });
    toggleopen();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    fieldChange({ key: event.target.id, value: event.target.value });
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
            <h3 className="text-lg font-semibold mb-4">
              Describe the new recipe: {`${recipeInfo.recipeName}`}
            </h3>

            {/* Input field */}
            <textarea
              onChange={(event: any) => onChange(event)}
              className="bg-black shadow focus:shadow-outline border w-full text-gray-100 leading-tight appearance-none focus:outline-none text-left placeholder-gray-400"
              id="instructions"
              placeholder="Instructions"
              value={recipeInfo.instructions || ""}
              rows={5}
            ></textarea>

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
