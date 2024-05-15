import { Dispatch, SetStateAction } from "react";

import { Build } from "@/__generated__/graphql";
import { ShareRecipeList } from "@/components/recipe/share/ShareRecipeList";

export const ShareRecipeModal = ({
  build,
  open,
  toggleopen
}: {
  build: Build;
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
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
            className="max-h-80 max-w-xl rounded border bg-black p-6 shadow-lg"
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
              Share this build: {`${build.buildName}`} for{" "}
              {`${build.recipe.name}`}
            </div>
            <ShareRecipeList build={build} />
            {/* Input field */}

            {/* Optional button to submit the form */}
          </div>
        </div>
      )}
    </div>
  );
};
