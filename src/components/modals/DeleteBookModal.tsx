import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";

import { DELETE_BOOK } from "@/graphql/mutations/recipeBook";
import { RecipeBook } from "@/__generated__/graphql";
import { USER_RECIPE_LIST } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";
import { selectedRecipe } from "@/graphql/reactiveVar/recipes";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const DeleteBookModal = ({
  book,
  open,
  toggleopen
}: {
  book: RecipeBook;
  open: boolean;
  toggleopen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: session } = useSession();
  const recipe = useReactiveVar(selectedRecipe);
  const alerts = useReactiveVar(alertList);
  const router = useRouter();

  const [deleteBook, feedback] = useMutation(DELETE_BOOK, {
    refetchQueries: [USER_RECIPE_LIST]
  });

  const closeModal = () => {
    toggleopen(false);
  };

  const handleDeleteBook = async () => {
    console.log(book.permission);
    const { data } = await deleteBook({
      variables: {
        id: book.id,
        permission: book.permission
      }
    });

    alertList([
      ...alerts,
      {
        code: "success",
        message: `${book.name} has been deleted`
      }
    ]);

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
              Are you sure you want to delete:{" "}
              {`${book.name}? This process cannot be undone.`}
            </div>
            <button
              onClick={handleDeleteBook}
              className="float-left border p-2"
            >
              <span className="block">Delete</span>
              <span className="block">Book</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
