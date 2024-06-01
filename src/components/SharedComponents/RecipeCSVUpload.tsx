import * as d3 from "d3";

import { CreateBuildInput, TouchInput } from "@/__generated__/graphql";
import React, { useState } from "react";

const CSVtoJSON = () => {
  const [jsonData, setJsonData] = useState<CreateBuildInput[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files?.[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (event.target) {
          const csvData = event.target.result;
          const data = d3.csvParse(csvData as string);

          const formattedData: CreateBuildInput[] = data.map(row => {
            const touchArray: TouchInput[] = [];
            for (let i = 1; i <= touchArray.length + 1; i++) {
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

            return {
              recipe: { name: row.Name },
              about: row.About,
              buildName: row["Build Name"],
              glassware: row.Glassware,
              ice: row.Ice,
              instructions: row.Instructions,
              touchArray
            };
          });

          setJsonData(formattedData);
        }
      };
      fileReader.readAsText(selectedFile);
    }
  };

  return (
    <div>
      <h3>Upload CSV File</h3>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleUpload}>Upload</button>
      <pre className="max-w-2xl text-wrap">
        {JSON.stringify(jsonData, null, 2)}
      </pre>
    </div>
  );
};

export default CSVtoJSON;
