"use client";

import { FetchResult, useMutation } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";

import { ADD_MANY_INGREDIENTS } from "@/graphql/mutations/ingredients";
import { StatusMessage } from "@/__generated__/graphql";
import { csv } from "d3";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState("");
  const [addManyIngredients] = useMutation(ADD_MANY_INGREDIENTS);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const values = await csv(selectedFile);
    console.log(values);

    const response: FetchResult<StatusMessage> = await addManyIngredients({
      variables: {
        createManyIngredientInputs: values
      }
    });
    console.log(response);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-xl">Upload Ingredients File</h3>
      <div className="flew-row flex">
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default UploadFile;
