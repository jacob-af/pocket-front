import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { Build } from "@/__generated__/graphql";
import { DELETE_BUILD } from "@/app/graphql/mutations/recipes";
import { DeleteRecipeModal } from "./DeleteRecipeModal";
import { USER_RECIPES } from "@/app/graphql/queries/recipe";
import { alertList } from "@/app/graphql/reactiveVar/alert";
import { selectedRecipe } from "@/app/graphql/reactiveVar/recipes";
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
    console.log(data);
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
    <div>
      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 mx-auto bg-gray-800 bg-opacity-80 flex justify-center items-center z-50"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="p-6 bg-black block max-w-lg"
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
              Are you sure you want to delete: {`${build.buildName}`} for{" "}
              {`${build.recipe.name}? This process cannot be undone.`}
            </div>
            <button
              onClick={handleDeleteBuild}
              className="border p-2 float-left"
            >
              <span className=" block">Delete</span>
              <span className=" block">Build</span>
            </button>
            {recipe.createdBy?.id == session?.user.id && (
              <button
                onClick={handleDeleteRecipe}
                className="border border-red-800 p-2 float-right text-red-800"
              >
                <span className=" block">Delete</span>
                <span className=" block">Recipe</span>
              </button>
            )}
          </div>
        </div>
      )}
      <DeleteRecipeModal build={build} open={openModal} toggleopen={setOpen} />
    </div>
  );
};
