"use client";

import { useState } from "react";
import { ListItem } from "@/__generated__/graphql";
import { useReactiveVar, ReactiveVar } from "@apollo/client";
import { RecipeChangeFunction, IngredientChangeFunction } from "./recipeHooks";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Press_Start_2P } from "next/font/google";

const filter = createFilterOptions<SpecialListItem>();

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400"
});

interface SpecialListItem {
  inputValue?: string;
  name: string;
  id: string;
}

export default function MuiDropDown({
  list,
  handleChange,
  index
}: {
  list: ReactiveVar<SpecialListItem[]>;
  handleChange: RecipeChangeFunction | IngredientChangeFunction;
  index: number;
}) {
  const options = useReactiveVar(list);

  const [value, setValue] = useState<SpecialListItem | null>(null);

  return (
    <Autocomplete
      className="bg-black"
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
            id: value?.id || ""
          });
          handleChange(newValue, index);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
            id: ""
          });
          handleChange(newValue.inputValue, index);
        } else {
          setValue(newValue);
          if (newValue) {
            handleChange(newValue.name, index);
          }
          console.log(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(option => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            //inputValue,
            name: `Add "${inputValue}"`,
            id: ""
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={options}
      getOptionLabel={option => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => (
        <li
          key={option.id}
          {...props}
          className={`${pressStart.className} antialiased bg-black text-white`}
        >
          {option.name}
        </li>
      )}
      freeSolo
      renderInput={params => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            style: {
              color: "white",
              fontFamily: `${pressStart.style.fontFamily}`
            }
          }}
        />
      )}
    />
  );
}
