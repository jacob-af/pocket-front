"use client";

import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import CheckIcon from "@mui/icons-material/Check";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { Build, Recipe } from "@/__generated__/graphql";
import sortByLevenshteinDistance from "../../../components/levenshteinSort";
import RecipeCard from "./RecipeCard";
import { userRecipeList } from "@/app/Apollo/recipes";
import { useReactiveVar } from "@apollo/client";

export default function RecipeDropDown() {
  const recipes = useReactiveVar(userRecipeList);
  const [selected, setSelected] = useState<Recipe>(recipes[0]);
  const [query, setQuery] = useState("");
  const filteredRecipes =
    query === "" ? recipes : sortByLevenshteinDistance(recipes, query);
  return (
    <div className="fixed top-16 w-72">
      <Combobox value={selected || "loading"} onChange={setSelected} nullable>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden  bg-black text-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(recipe: Recipe) => recipe?.name}
              onChange={event => {
                console.log(event);
                setQuery(event.target.value);
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <UnfoldMoreIcon
                className="h-5 w-5 text-black"
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredRecipes.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredRecipes.map(recipe => (
                  <Combobox.Option
                    key={recipe.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-gray-500 ${
                        active ? "bg-gray-300 text-white" : "text-gray-900"
                      }`
                    }
                    value={recipe}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {recipe.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-gra-400" : "text-gray-900"
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      {selected ? <RecipeCard recipe={selected} /> : ""}
    </div>
  );
}
