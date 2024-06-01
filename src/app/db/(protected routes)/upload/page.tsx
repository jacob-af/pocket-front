"use client";

import CSVtoJSON from "@/components/SharedComponents/RecipeCSVUpload";
import UploadFile from "@/components/SharedComponents/IngredientFileUpload";
import { UploadRecipeFile } from "@/components/SharedComponents/RecipeFileDownload";
import UploadStockFile from "@/components/SharedComponents/StockFileUpload";

export default function Recipe() {
  return (
    <div className="mt-24 flex flex-col items-center">
      <UploadFile />
      <UploadStockFile />
      <UploadRecipeFile />
      <CSVtoJSON />
    </div>
  );
}
