"use client";

import { CreateBuildInput, Recipe } from "@/__generated__/graphql";
import { FetchResult, useQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";

export const UploadRecipeFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (event.target) {
          const jsonData = JSON.parse(event.target.result as string);
          setJsonData(jsonData);
          const csvData = convertToCSV(jsonData);

          const currentDate = new Date();
          const fileName = `cocktail_data_${currentDate.getFullYear()}_${
            currentDate.getMonth() + 1
          }_${currentDate.getDate()}.csv`;

          const csvBlob = new Blob([csvData], { type: "text/csv" });
          const csvUrl = URL.createObjectURL(csvBlob);
          const a = document.createElement("a");
          a.href = csvUrl;
          a.download = fileName;
          a.click();
        }
      };
      fileReader.readAsText(selectedFile);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-xl">Upload Inventory File</h3>
      <div className="flew-row flex">
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleDownload}>Upload</button>
      </div>
    </div>
  );
};

function convertToCSV(data: CreateBuildInput[]): string {
  const csvRows = [];
  const headers = [
    "Name",
    "About",
    "Build Name",
    "Glassware",
    "Ice",
    "Instructions"
  ];

  const maxIngredients = Math.max(...data.map(item => item.touchArray.length));

  for (let i = 0; i < maxIngredients; i++) {
    headers.push(`Ingredient ${i + 1}`);
    headers.push(`Amount ${i + 1}`);
    headers.push(`Unit ${i + 1}`);
  }

  csvRows.push(headers.join(","));

  data.forEach(item => {
    const row = [
      item.recipe.name,
      `"${item.recipe.about}"`,
      item.buildName,
      item.glassware,
      item.ice,
      `"${item.instructions}"`
    ];
    for (let i = 0; i < maxIngredients; i++) {
      const touch = item.touchArray[i];
      row.push(touch?.ingredient.name ? touch.ingredient.name : "");
      row.push(touch?.amount ? touch.amount.toString() : "");
      row.push(touch?.unit.abbreviation ? touch.unit.abbreviation : "");
    }

    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
}
