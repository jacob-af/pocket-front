"use client";

import {
  Build,
  CreateBuildInput,
  Recipe,
  RecipeBook
} from "@/__generated__/graphql";
import { FetchResult, useLazyQuery, useQuery } from "@apollo/client";
import React, { ChangeEvent, MouseEvent, useState } from "react";

import { GET_RECIPE_BOOK } from "@/graphql/queries/recipeBook";

export const DownloadRecipeBook = ({ name }: { name: string }) => {
  const [buildData, setBuildData] = useState<Build[] | null>(null);

  const [getData, { loading, error }] = useLazyQuery(GET_RECIPE_BOOK, {
    onCompleted: (response: { book: RecipeBook }) => {
      const newBooks = response.book.userBuild;
      console.log(newBooks);
      setBuildData(newBooks);
    },
    fetchPolicy: "network-only"
  });

  const prepareCSV = (event: MouseEvent<HTMLButtonElement>) => {
    getData({
      variables: {
        name
      }
    });
  };

  const handleDownload = async () => {
    if (buildData) {
      //console.log(buildData);
      const csvData = convertToCSV(buildData);
      console.log(csvData);
      const currentDate = new Date();
      const fileName = `${name}_RecipeBook_${currentDate.getFullYear()}_${
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
  // fileReader.readAsText(selectedFile);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flew-row flex">
        {buildData ? (
          <button onClick={handleDownload}>Download CSV</button>
        ) : (
          <button onClick={prepareCSV}>Prepare CSV</button>
        )}
      </div>
    </div>
  );
};

function convertToCSV(data: Build[]): string {
  const csvRows = [];
  const headers = [
    "BuildId",
    "Name",
    "About",
    "Build Name",
    "Glassware",
    "Ice",
    "Instructions",
    "Image"
  ];

  const maxIngredients = Math.max(...data.map(item => item.touch.length));

  for (let i = 0; i < maxIngredients; i++) {
    headers.push(`Ingredient ${i + 1}`);
    headers.push(`Amount ${i + 1}`);
    headers.push(`Unit ${i + 1}`);
  }

  csvRows.push(headers.join(","));

  data.forEach(item => {
    const row = [
      item.id,
      item.recipe.name,
      `"${item.recipe.about}"`,
      item.buildName,
      item.glassware,
      item.ice,
      `"${item.instructions}"`,
      item.image
    ];
    for (let i = 0; i < maxIngredients; i++) {
      const touch = item.touch[i];
      row.push(touch?.ingredient.name ? touch.ingredient.name : "");
      row.push(touch?.amount ? `"${touch.amount.toString()}"` : "");
      row.push(touch?.unit.abbreviation ? touch.unit.abbreviation : "");
    }

    csvRows.push(row.join(","));
  });

  return csvRows.join("\n");
}
