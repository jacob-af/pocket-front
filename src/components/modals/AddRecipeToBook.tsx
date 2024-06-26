"use client";

import {
  ADD_BUILD_TO_BOOK,
  REMOVE_BUILD_FROM_BOOK
} from "@/graphql/mutations/recipeBook";
import { Build, Permission, Recipe } from "@/__generated__/graphql";
import React, { MouseEvent, useEffect } from "react";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { GET_RECIPE_BOOK } from "@/graphql/queries/recipeBook";
import { USER_RECIPE_LIST } from "@/graphql/queries/recipe";
import { alertList } from "@/graphql/reactiveVar/alert";
import { newBookInfo } from "@/graphql/reactiveVar/recipeBooks";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [addBuild] = useMutation(ADD_BUILD_TO_BOOK, {
    refetchQueries: [USER_RECIPE_LIST, GET_RECIPE_BOOK]
  });
  const [removeBuild] = useMutation(REMOVE_BUILD_FROM_BOOK, {
    refetchQueries: [USER_RECIPE_LIST, GET_RECIPE_BOOK]
  });
  const { data } = useQuery(USER_RECIPE_LIST, {
    //fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (data?.userRecipeList) {
      const recipes = data.userRecipeList.filter(recipe => {
        return recipe.userBuild && recipe.userBuild.length > 0;
      });
      userRecipeList(recipes);
    }
  }, [data?.userRecipeList]);

  const closeModal = (e: MouseEvent) => {
    e.preventDefault();
    newBookInfo({ name: "", description: "" });
    toggleopen();
  };

  // Function to handle the click event
  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    toggleopen();
    router.push(`/db/recipeBook/${encodeURIComponent(book.name)}`);
  };

  // Function to add a build to the book
  const add = async (userBuild: Build, e: MouseEvent) => {
    e.preventDefault();
    console.log(userBuild.permission, book.permission);
    try {
      const res = await addBuild({
        variables: {
          recipeBookId: book.id,
          buildId: userBuild.id,
          buildPermission: userBuild.permission,
          bookPermission: book.permission
        }
      });
      selectedRecipeBook({
        ...book,
        userBuild: [...book.userBuild, userBuild]
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Function to remove a build from the book
  const remove = async (build: Build, e: MouseEvent) => {
    e.preventDefault();
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
        userBuild: book.userBuild.filter(b => b.id !== build.id)
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Modal component return JSX
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
                .filter((build): build is Build => !!build)
                .map((build: Build, index: number) => {
                  return (
                    <div
                      key={build.id}
                      className="short-card flex justify-between"
                    >
                      <div className="flex items-end justify-end">
                        <span className="pr-2">{build.recipe.name}:</span>
                        <span className="text-sm">{build.buildName}</span>
                      </div>
                      {book.userBuild &&
                      book.userBuild.some(b => b.id === build.id) ? (
                        <button
                          className="pr-6"
                          onClick={e => remove(build, e)}
                        >
                          Remove
                        </button>
                      ) : (
                        <button className="pr-6" onClick={e => add(build, e)}>
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
