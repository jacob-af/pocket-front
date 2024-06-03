"use client";

import CSVtoJSON from "@/components/SharedComponents/RecipeCSVUpload";
import UploadFile from "@/components/SharedComponents/IngredientFileUpload";
import UploadStockFile from "@/components/SharedComponents/StockFileUpload";

export default function Recipe() {
  return (
    <div className="mt-24 flex flex-col items-center">
      <UploadFile />
      <UploadStockFile />
    </div>
  );
}
