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
  toggleOpen: () => void;
}

export default function MuiDropDownWModal({
  list,
  handleChange,
  index,
  currentValue,
  children
}: {
  list: ReactiveVar<SpecialListItem[]>;
  handleChange: RecipeChangeFunction | IngredientChangeFunction;
  index: number;
  currentValue: string;
  children: ReactNode;
}) {
  const options = useReactiveVar(list);
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => setOpen(!open);
  console.log("currentValue:", currentValue);

  // Clone the child element and pass open and setOpen as props
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement<ChildProps>(child)) {
      // Clone the child element and pass the open and setOpen props
      return React.cloneElement(child, { open, toggleOpen });
    }
    return child; // Return non-element children as is
  });

  return (
    <>
      <Autocomplete
        className="bg-black"
        value={currentValue}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              handleChange(newValue, index);
              setOpen(true);
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            handleChange(newValue.inputValue, index);
            setOpen(true);
          } else {
            if (newValue) {
              handleChange(newValue.name, index);
            }
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
            key={option.id + option.name}
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