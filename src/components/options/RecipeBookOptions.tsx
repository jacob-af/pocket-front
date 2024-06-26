import AddRecipeBookButton from "@/components/buttons/AddRecipeBookButton";
import { AddRecipeToBookModal } from "@/components/modals/AddRecipeToBook";
import { DeleteBookButton } from "@/components/buttons/DeleteBook";
import { DownloadRecipeBook } from "@/components/SharedComponents/RecipeBookDownload";
import EditRecipeBookButton from "@/components/buttons/EditRecipeBookButton";
import { ShareBookModal } from "@/components/modals/ShareBookModal";
import { UploadBookModal } from "@/components/modals/UploadBookModal";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";

function RecipeBookOptions() {
  const book = useReactiveVar(selectedRecipeBook);
  const { data: session } = useSession();
  const [openBook, setOpenBook] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  function addRecipe() {
    setOpenBook(!openBook);
  }

  function handleShare() {
    setOpenShare(!openShare);
  }
  function handleUpload() {
    setOpenUpload(!openUpload);
  }

  if (!book.createdBy) {
    console.log(book, ": no creator");
    return <div>Book selection error</div>;
  }
  return (
    <div>
      {(book.permission === "OWNER" || book.permission === "MANAGER") && (
        <nav className="bg-background z-20 mt-auto box-border flex flex-col items-center justify-center text-lg">
          <AddRecipeToBookModal open={openBook} toggleopen={addRecipe} />
          <ShareBookModal open={openShare} toggleopen={handleShare} />
          <UploadBookModal
            open={openUpload}
            toggleopen={handleUpload}
            bookId={book.id}
          />
          <div className="flex flex-col items-center justify-around text-lg">
            <AddRecipeBookButton />
            <EditRecipeBookButton />
            <button onClick={addRecipe} className="p-2">
              <div>Add/Remove Recipes</div>
            </button>
            <button onClick={handleShare} className="p-2">
              <div>Share Book</div>
            </button>
            <button onClick={handleUpload} className="p-2">
              <div>Upload CSV</div>
            </button>
            <DownloadRecipeBook name={book.name} />
            {book.createdBy.id === session?.user.id && <DeleteBookButton />}
          </div>
        </nav>
      )}
    </div>
  );
}

export default RecipeBookOptions;
