"use client";

import { CocktailPicture } from "@/components/images/CocktailPicture";
import { UploadDropzone } from "@/components/SharedComponents/uploadthing";
import { newRecipeInfo } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

export default function PictureUpload() {
  const recipeInfo = useReactiveVar(newRecipeInfo);

  return (
    <div className="min-w-xl flex flex-col items-center">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={res => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          newRecipeInfo({
            ...recipeInfo,
            image: res[0].url
          });
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      <CocktailPicture url={recipeInfo.image ?? "/withcherry200.png"} />
    </div>
  );
}
