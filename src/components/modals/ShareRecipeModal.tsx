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
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="p-6 bg-black border block w-md rounded shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right- hover:text-gray-400"
            >
              &times;
            </button>

            {/* Modal content */}
            <h3 className="text-lg font-semibold mb-4">
              Share this build: {`${build.buildName}`} for{" "}
              {`${build.recipe.name}`}
            </h3>
            {build.permission}
            <ShareRecipeList build={build} />
            {/* Input field */}

            {/* Optional button to submit the form */}
          </div>
        </div>
      )}
    </div>
  );
};
