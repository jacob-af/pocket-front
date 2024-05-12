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
      const recipes = data?.userRecipe
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
          buildId: build.id,
          recipeBookId: book.id,
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
          buildId: build.id,
          recipeBookId: book.id,
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
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-80"
          onClick={closeModal} // Close modal when clicking outside of the modal content
        >
          <div
            className="p-6 relative rounded border border-black shadow-xl w-80"
            onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Modal content */}
            <div className="text-lg font-semibold mb-4">
              Add recipes to your book:
            </div>

            <div className="content-center overflow-scroll h-80">
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
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
