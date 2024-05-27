"use client";

import { FetchResult, useMutation } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";

import { CREATE_MANY_STOCKS } from "@/graphql/mutations/inventory";
import { StatusMessage } from "@/__generated__/graphql";
import { csv } from "d3";

const UploadStockFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createManyStocks] = useMutation(CREATE_MANY_STOCKS);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const values = await csv(URL.createObjectURL(selectedFile), row => ({
        ingredientName: row.ingredientName,
        amount: parseFloat(row.amount),
        unitAbb: row.unitAbb,
        price: parseFloat(row.price)
      }));
      console.log(values);

      const response: FetchResult<StatusMessage> = await createManyStocks({
        variables: {
          createManyStocks: values,
          inventoryId: "038ecd00-bb36-4d70-96d7-f618db3244b2" //needs drop down to select from user options
        }
      });
      console.log(response);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <h3>Upload Stock File</h3>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadStockFile;
