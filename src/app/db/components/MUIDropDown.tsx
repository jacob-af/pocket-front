"use client";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { HTMLAttributes, ReactNode, useState } from "react";

import { ListItem } from "@/types/util";
import TextField from "@mui/material/TextField";
import { pressStart } from "@/lib/pressStart";
import { v4 as uuidv4 } from "uuid";

const filter = createFilterOptions<ListItem>();

interface ChildProps {
  open: boolean;
  toggleopen: () => void;
}

export default function MuiDropDown({
  options,
  handleChange,
  index,
  currentValue,
  children
}: {
  options: ListItem[];
  handleChange: (item: ListItem) => void;
  index: number;
  currentValue: ListItem;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [uuid, setUuid] = useState<string>("");
  const toggleopen = () => setOpen(!open);

  // Clone the child element and pass open and setOpen as props
  const clonedChildren = React.Children.map(children, child => {
    if (React.isValidElement<ChildProps>(child)) {
      // Clone the child element and pass the open and setOpen props
      return React.cloneElement(child, { open, toggleopen });
    }
    return child; // Return non-element children as is
  });

  return (
    <>
      <Autocomplete
        className="w-full bg-white border text-black"
        value={currentValue.name}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setTimeout(() => {
              handleChange({ name: newValue, id: "", index });
              setOpen(true);
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            handleChange({ ...newValue, index });
            setOpen(true);
          } else {
            if (newValue) {
              handleChange({ ...newValue, index });
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
              id: uuidv4()
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
        renderOption={(props: HTMLAttributes<HTMLLIElement>, option) => {
          const uniqueKey = `${index}-${uuidv4()}-${option.id}`;
          return (
            <li
              {...props}
              key={uniqueKey}
              className={`${pressStart.className} antialiased py-1 px-2 hover:bg-gray-400 focus-visible:bg-red-800`}
            >
              <div className="focus-visible:bg-red-800">{option.name}</div>
              {option.build && option.build.length > 1 ? (
                <div className="text-xxs">{`${option.build.length} Builds Available`}</div>
              ) : null}
            </li>
          );
        }}
        freeSolo
        renderInput={params => {
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: {
                  color: "black",
                  fontFamily: `${pressStart.style.fontFamily}`
                }
              }}
              className="w-full"
            />
          );
        }}
      />
      <div>
        {/* Pass the props to children */}
        {clonedChildren}
      </div>
    </>
  );
}
