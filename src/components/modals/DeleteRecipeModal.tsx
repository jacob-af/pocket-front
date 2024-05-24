import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { DELETE_BUILD } from "@/graphql/mutations/recipes";
import { USER_RECIPES } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";

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
    refetchQueries: [USER_RECIPES]
  });

  const closeModal = () => {
    toggleopen(false);
  };
  const handleDeleteRecipe = async () => {
    try {
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
      toggleopen(false);
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alertList([...alerts, { code: "error", message: errorMessage }]);
      console.log(error);
    }
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
            className="bg-contrast block max-w-lg items-center justify-center p-6"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="right-2 top-20 hover:text-gray-400"
            >
              &times;
            </button>

            {/* Modal content */}

            <div className="mb-4 text-xl font-semibold text-red-800">
              Are you sure you want to delete
              {` ${build.recipe.name}? This process cannot be undone.  It will delete every build anyone has made for this recipe.  Someone might have a really bad day.  Like, are you really really sure?`}
            </div>

            <button
              onClick={handleDeleteRecipe}
              className="mx-auto block border border-white p-2 text-center text-red-800"
            >
              <span className="block">Delete</span>
              <span className="block">Recipe</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
