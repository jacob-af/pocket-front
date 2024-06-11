import * as d3 from "d3";

import {
  CreateBuildInput,
  TouchInput,
  UpdateBuildInput
} from "@/__generated__/graphql";
import React, { useState } from "react";

import { UPLOAD_BOOK } from "@/graphql/mutations/recipeBook";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

const CSVtoJSON = ({ bookId }: { bookId: string }) => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadBook, feedback] = useMutation(UPLOAD_BOOK);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = async event => {
        if (event.target) {
          const csvData = event.target.result;
          try {
            const parsedData = d3.csvParse(csvData as string);

            const formattedData: UpdateBuildInput[] = parsedData.map(
              (row, index) => {
                const touchArray: TouchInput[] = [];
                for (let i = 1; i <= 9; i++) {
                  if (
                    row[`Ingredient ${i}`] &&
                    row[`Amount ${i}`] &&
                    row[`Unit ${i}`]
                  ) {
                    touchArray.push({
                      ingredient: { name: row[`Ingredient ${i}`] },
                      amount: parseFloat(row[`Amount ${i}`]),
                      unit: { abbreviation: row[`Unit ${i}`] }
                    });
                  }
                }

                if (!row.Name || !row["Build Name"]) {
                  throw new Error(
                    `Row ${
                      index + 1
                    }: Missing required fields (BuildId, Name, Build Name).`
                  );
                }

                return {
                  buildId: row.BuildId || "",
                  recipe: {
                    name: row.Name,
                    about: row.About
                  },
                  buildName: row["Build Name"],
                  glassware: row.Glassware,
                  ice: row.Ice,
                  instructions: row.Instructions,
                  image: row.Image,
                  touchArray
                };
              }
            );

            const { data } = await uploadBook({
              variables: {
                updateManyBuildInput: formattedData,
                bookId
              }
            });
            console.log(data);
            setError(null); // Clear any previous errors
            router.push("/db/recipeBook");
          } catch (e) {
            if (e instanceof Error) {
              setError(`Error: ${e.message}`);
            } else {
              setError(
                "Failed to parse CSV data. Please check the file format."
              );
            }
            console.error(e);
          }
        }
      };
      fileReader.readAsText(selectedFile);
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CSVtoJSON;
