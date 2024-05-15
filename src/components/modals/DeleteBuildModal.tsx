import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { DELETE_BUILD } from "@/graphql/mutations/recipes";
import { DeleteRecipeModal } from "./DeleteRecipeModal";
import { USER_RECIPES } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const DeleteBuildModal = ({
  build,
  open,
  toggleopen
}: {
  build: Build;
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const recipe = useReactiveVar(selectedRecipe);
  const alerts = useReactiveVar(alertList);
  const router = useRouter();
  const [openModal, setOpen] = useState(false);
  const [deleteBuild, feedback] = useMutation(DELETE_BUILD, {
    refetchQueries: [USER_RECIPES]
  });

  const closeModal = () => {
    toggleopen(false);
  };
  const handleDeleteRecipe = () => {
    toggleopen(false);
    setOpen(true);
  };
  const handleDeleteBuild = async () => {
    console.log(build.permission);
    const { data } = await deleteBuild({
      variables: {
        buildId: build.id,
        permission: build.permission
      }
    });

    alertList([
      ...alerts,
      {
        code: "success",
        message: `${build.buildName} has been deleted`
      }
    ]);
    selectedRecipe({
      id: "Uniqu3",
      name: "",
      about: "",
      build: [],
      userBuild: []
    });
    router.push("/db/recipe");
  };

  console.log(recipe);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-80"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="relative bg-black p-6"
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
            <div className="mb-4 text-xl">
              Are you sure you want to delete: {`${build.buildName}`} for{" "}
              {`${build.recipe.name}? This process cannot be undone.`}
            </div>
            <button
              onClick={handleDeleteBuild}
              className="float-left border p-2"
            >
              <span className="block">Delete</span>
              <span className="block">Build</span>
            </button>
            {recipe.createdBy?.id == session?.user.id && (
              <button
                onClick={handleDeleteRecipe}
                className="float-right border border-red-800 p-2 text-red-800"
              >
                <span className="block">Delete</span>
                <span className="block">Recipe</span>
              </button>
            )}
          </div>
        </div>
      )}
      <DeleteRecipeModal build={build} open={openModal} toggleopen={setOpen} />
    </>
  );
};
