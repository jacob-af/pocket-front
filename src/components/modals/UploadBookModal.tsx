import { Dispatch, SetStateAction } from "react";

import CSVtoJSON from "../SharedComponents/RecipeCSVUpload";
import { RecipeBook } from "@/__generated__/graphql";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";

export const UploadBookModal = ({
  open,
  toggleopen,
  bookId
}: {
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
  bookId: string;
}) => {
  // Function to close the modal
  const closeModal = () => {
    toggleopen(false);
  };

  return (
    <div>
      {open && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-90"
          onClick={closeModal}
        >
          <div
            className="bg-contrast max-h-80 max-w-xl rounded border p-6 shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="right-0 top-0">
              <button onClick={closeModal} className="hover:text-gray-400">
                &times;
              </button>
            </div>

            {/* Modal content */}
            <div className="mb-4 text-lg">
              Upload CSV
              <CSVtoJSON bookId={bookId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
