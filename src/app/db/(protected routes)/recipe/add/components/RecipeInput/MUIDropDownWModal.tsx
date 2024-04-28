"use client";

import React, { ReactNode, useState } from "react";
import { ListItem } from "@/__generated__/graphql";
import { useReactiveVar, ReactiveVar } from "@apollo/client";
import { RecipeChangeFunction, IngredientChangeFunction } from "../recipeHooks";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { pressStart } from "@/lib/pressStart";

const filter = createFilterOptions<SpecialListItem>();

interface SpecialListItem {
  inputValue?: string;
  name: string;
  id: string;
}

interface ChildProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function MuiDropDownWModal({
  list,
  handleChange,
  index,
  children
}: {
  list: ReactiveVar<SpecialListItem[]>;
  handleChange: RecipeChangeFunction | IngredientChangeFunction;
  index: number;
  children: ReactNode;
}) {
  const options = useReactiveVar(list);

  const [value, setValue] = useState<SpecialListItem | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // Clone the child element and pass open and setOpen as props
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement<ChildProps>(child)) {
      // Clone the child element and pass the open and setOpen props
      return React.cloneElement(child, { open, setOpen });
    }
    return child; // Return non-element children as is
  });

  return (
    <>
      <Autocomplete
        className="bg-black"
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              setOpen(true);
              setValue({
                name: newValue,
                id: value?.id || ""
              });
              handleChange(newValue, index);
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setOpen(true);
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
        sx={{ width: 300 }}
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
      <div>
        {/* Pass the props to children */}
        {clonedChildren}
      </div>
    </>
  );
}
