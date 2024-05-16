"use client";

import {
  ADD_BUILD_TO_BOOK,
  CREATE_BOOK,
  REMOVE_BUILD_FROM_BOOK
} from "@/graphql/mutations/recipeBook";
import { Build, Permission, Recipe } from "@/__generated__/graphql";
import React, { useEffect } from "react";
import {
  newBookInfo,
  userRecipeBookList
} from "@/graphql/reactiveVar/recipeBooks";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { USER_RECIPEBOOKS } from "@/graphql/queries/recipeBook";
import { USER_RECIPES } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { userRecipeList } from "@/graphql/reactiveVar/recipes";

export const AddRecipeToBookModal = ({
  open,
  toggleopen
}: {
  open: boolean;
  toggleopen: () => void;
}) => {
  const book = useReactiveVar(selectedRecipeBook);
  const recipeList = useReactiveVar(userRecipeList);
  const [addBuild] = useMutation(ADD_BUILD_TO_BOOK, {
    fetchPolicy: "network-only", // Used for first execution
    refetchQueries: [USER_RECIPEBOOKS]
  });
  const [removeBuild] = useMutation(REMOVE_BUILD_FROM_BOOK, {
    fetchPolicy: "network-only", // Change fetchPolicy to "network-only"
    refetchQueries: [USER_RECIPEBOOKS]
  });
  const { data, error, loading } = useQuery(USER_RECIPES, {
    fetchPolicy: "cache-and-network"
  });

  useEffect(() => {
    if (data?.userRecipe) {
      const recipes = data.userRecipe
        .filter(recipe => {
          return recipe?.userBuild.length > 0;
        })
        .map((recipe: Recipe) => {
          return {
            ...recipe,
            build: recipe.userBuild
          };
        });
      userRecipeList(recipes);
    }
  }, [data?.userRecipe]);

  const closeModal = () => {
    newBookInfo({ name: "", description: "" });
    toggleopen();
  };

  const onClick = async () => {
    toggleopen();
  };

  const add = async (build: Build) => {
    console.log(build.permission, book.permission);
    try {
      const res = await addBuild({
        variables: {
          recipeBookId: book.id,
          buildId: build.id,
          buildPermission: build.permission,
          bookPermission: book.permission
        }
      });
      console.log("nook: ", book);
      selectedRecipeBook({
        ...book,
        build: [...book.build, build]
      });
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async (build: Build) => {
    console.log(book.permission);
    try {
      await removeBuild({
        variables: {
          recipeBookId: book.id,
          buildId: build.id,
          bookPermission: book.permission
        }
      });

      selectedRecipeBook({
        ...book,
        build: book.build.filter(b => b.id !== build.id)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* Modal */}
      {open && (
        <div
          className="z-80 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="relative w-80 rounded border border-black p-6 shadow-xl"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <div className="mb-4 text-lg font-semibold">
              Add recipes to your book:
            </div>

            <div className="h-80 content-center overflow-scroll">
              {recipeList
                .flatMap(recipe => recipe.userBuild)
                .map((build: Build, index: number) => {
                  return (
                    <div
                      key={build.id}
                      className="short-card flex justify-between"
                    >
                      <div>
                        {build.recipe.name}
                        <div className="text-xxs">{build.buildName}</div>
                      </div>
                      {book.build && book.build.some(b => b.id === build.id) ? (
                        <button className="pr-6" onClick={() => remove(build)}>
                          Remove
                        </button>
                      ) : (
                        <button className="pr-6" onClick={() => add(build)}>
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={onClick}
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
