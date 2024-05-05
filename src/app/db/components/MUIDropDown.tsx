"use client";

import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import React, { HTMLAttributes, ReactNode, useState } from "react";

import { ListItem } from "@/types/apollo";
import TextField from "@mui/material/TextField";
import { pressStart } from "@/lib/pressStart";

const filter = createFilterOptions<ListItem>();

interface ChildProps {
  open: boolean;
  toggleopen: () => void;
}

export default function MuiDropDown({
  options,
  handleChange,
  index = 0,
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
        className="w-full bg-black text-white"
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
        renderOption={(props: HTMLAttributes<HTMLLIElement>, option) => {
          return (
            <li
              {...props}
              key={option.id}
              className={`${pressStart.className} antialiased py-1 px-2`}
            >
              <div>{option.name}</div>
              {option.build && option.build.length > 1 ? (
                <div className="text-xxs">{`${option.build.length} Builds Available`}</div>
              ) : null}
              {}
            </li>
          );
        }}
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
            className="w-full"
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
