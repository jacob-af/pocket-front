import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { AddRecipeToBookModal } from "@/components/modals/AddRecipeToBook";
import { EDIT_BOOK } from "@/graphql/mutations/recipeBook";
import { EditBookModal } from "@/components/modals/EditBookModal";
import EditRecipeBookButton from "@/components/buttons/EditRecipeBookButton";
import { RecipeBook } from "@/__generated__/graphql";
import { ShareBookModal } from "@/components/modals/ShareBookModal";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

export function BookNavBar({ book }: { book: RecipeBook }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [openBook, setOpenBook] = useState(false);
  const [openShare, setOpenShare] = useState(false);

  function addRecipe() {
    setOpenBook(!openBook);
  }
  function handleShare() {
    setOpenShare(!openShare);
  }

  function handleDelete() {}

  if (!session) {
    router.push("/db/recipeBook");
    return;
  }

  if (!book.createdBy) {
    console.log(book);
    return <div>Book selection error</div>;
  }

  console.log(book);
  return (
    <>
      {book.permission === ("OWNER" || "MANAGER") && (
        <nav className="bg-background z-20 mb-16 mt-auto box-border flex h-20 w-screen max-w-2xl flex-col items-center justify-center">
          <AddRecipeToBookModal open={openBook} toggleopen={addRecipe} />
          <ShareBookModal open={openShare} toggleopen={handleShare} />
          <div className="flex w-full max-w-2xl flex-row items-center justify-around text-xs">
            <EditRecipeBookButton />
            <button onClick={addRecipe}>
              <div>Add/Remove</div>
              <div>Recipes</div>
            </button>
            <button onClick={handleShare}>
              <div>Share</div>
              <div>Book</div>
            </button>
            {book.createdBy.id === session.user.id && (
              <button onClick={handleDelete} className="text-red-500">
                <div>Delete</div>
                <div>Book</div>
              </button>
            )}
          </div>
        </nav>
      )}
    </>
  );
}
