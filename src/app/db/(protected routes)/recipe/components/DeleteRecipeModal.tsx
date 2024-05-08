import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { DELETE_BUILD } from "@/app/graphql/mutations/recipes";
import { USER_BUILDS } from "@/app/graphql/queries/recipe";
import { alertList } from "@/app/graphql/reactiveVar/alert";

export const DeleteRecipeModal = ({
  build,
  open,
  toggleopen
}: {
  build: Build;
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const alerts = useReactiveVar(alertList);

  const [deleteBuild, feedback] = useMutation(DELETE_BUILD, {
    refetchQueries: [USER_BUILDS]
  });

  const closeModal = () => {
    toggleopen(false);
  };
  const handleDeleteRecipe = async () => {
    const { data } = await deleteBuild({
      variables: {
        buildId: build.id,
        permission: build.permission
      }
    });
    console.log(data);
    alertList([
      ...alerts,
      {
        code: "success",
        message: `${build.recipe.name} has been deleted`
      }
    ]);
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
            className="p-6 bg-black border block w-md shadow-lg"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="top-20 right-2 hover:text-gray-400"
            >
              &times;
            </button>

            {/* Modal content */}

            <div className="text-xl font-semibold mb-4">
              Are you sure you want to delete
              {`${build.recipe.name}? This process cannot be undone.  It will delete every build anyone has made for this recipe.  Someone might have a really bad day.  Like, are you really really sure?`}
            </div>

            <button onClick={handleDeleteRecipe}>delete recipe</button>
          </div>
        </div>
      )}
    </div>
  );
};
