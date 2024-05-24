import { Dispatch, SetStateAction } from "react";

import { RecipeBook } from "@/__generated__/graphql";
import { ShareBookList } from "@/components/recipeBook/share/ShareBookList";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";

export const ShareBookModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const book = useReactiveVar(selectedRecipeBook);

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
              Share this recipe book: {`${book.name}`}?
            </div>
            <ShareBookList book={book} />
            {/* Input field */}

            {/* Optional button to submit the form */}
          </div>
        </div>
      )}
    </div>
  );
};
