"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import CheckIcon from "@mui/icons-material/Check";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { ListItem } from "@/__generated__/graphql";
import sortByLevenshteinDistance from "../../../components/levenshteinSort";
import { useReactiveVar, ReactiveVar } from "@apollo/client";
import {
  RecipeChangeFunction,
  IngredientChangeFunction
} from "../add/components/recipeHooks";

export default function PropDown({
  list,
  handleChange,
  index
}: {
  list: ReactiveVar<ListItem[]>;
  handleChange: RecipeChangeFunction | IngredientChangeFunction;
  index: number;
}) {
  const options = useReactiveVar(list);
  //const selected = useReactiveVar(selector);
  const [selected, setSelected] = useState<ListItem>({ id: "", name: "" });
  const [query, setQuery] = useState("");
  const filteredOptions =
    query === "" ? options : sortByLevenshteinDistance(options, query);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    console.log("before handleChange");
    handleChange(event.target.value, index);
    setSelected({ id: "", name: event.target.value });
  };

  return (
    <div className="flex flex-col w-sm">
      <Combobox
        value={selected || "loading"}
        onChange={(value: ListItem) => {
          setQuery(value.name);
          setSelected(value);
        }}
        nullable
      >
        <div className="relative mt-1">
          <div className="relative bg-black shadow-md w-full text-left text-white sm:text-sm cursor-default overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-300">
            <Combobox.Input
              className="py-2 pr-10 pl-3 border-none w-full text-gray-900 text-sm leading-5 focus:ring-0"
              displayValue={(option: ListItem) => option?.name}
              onChange={event => onChange(event)}
            />
            <Combobox.Button className="right-0 absolute inset-y-0 flex items-center pr-2">
              <UnfoldMoreIcon
                className="w-5 h-5 text-black"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute bg-white shadow-lg mt-1 py-1 rounded-md w-full max-h-60 text-base sm:text-sm overflow-auto ring-1 ring-black/5 focus:outline-none z-10">
              {query.length > 0 && filteredOptions?.length === 0 ? (
                <Combobox.Option
                  className="relative px-4 py-2 text-gray-700 cursor-default select-none"
                  value={{ id: null, name: query }}
                >
                  Create {query}
                </Combobox.Option>
              ) : (
                filteredOptions?.map(option => (
                  <Combobox.Option
                    key={option.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-300 ${
                        active ? "bg-gray-200 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-gra-400" : "text-gray-900"
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
