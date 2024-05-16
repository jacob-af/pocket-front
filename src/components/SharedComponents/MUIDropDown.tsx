"use client";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { HTMLAttributes, ReactNode, useState } from "react";

import { ListItem } from "@/types/util";
import TextField from "@mui/material/TextField";
import { cutive } from "@/lib/cutive";
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
        className="z-80 box-border w-full rounded-lg bg-white text-black"
        value={currentValue.name}
        onChange={(event, newValue, reason) => {
          if (reason === "clear") {
            handleChange({ name: "", id: "unique", index });
          } else if (typeof newValue === "string") {
            setTimeout(() => {
              handleChange({ name: newValue, id: "", index });
              setOpen(true);
            }, 100);
          } else if (newValue && newValue.inputValue) {
            setTimeout(() => {
              handleChange({ name: newValue, id: "", index });
              setOpen(true);
            }, 100);
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
        openOnFocus
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
              className={`${cutive.className} antialiased py-1 px-2 hover:bg-gray-400 focus-visible:bg-red-800`}
            >
              <div className="focus-visible:bg-red-800">{option.name}</div>
              {option.build && option.build.length > 1 ? (
                <div className="text-xxs">{`${option.build.length} Builds Available`}</div>
              ) : null}
            </li>
          );
        }}
        freeSolo
        clearText="Select"
        renderInput={params => {
          return (
            <TextField
              {...params}
              size="small"
              InputProps={{
                ...params.InputProps,
                style: {
                  color: "black",
                  fontFamily: `${cutive.style.fontFamily}`,
                  height: "2rem",
                  borderRadius: "0.5rem"
                }
              }}
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
