"use client";

import * as React from "react";

import { Build, RecipeBook } from "@/__generated__/graphql";

import { BookCoverImage } from "@/components/images/BookCoverImage";
import { Expand } from "@/components/images/Images";
import { selectedRecipeBook } from "@/graphql/reactiveVar/recipeBooks";
import { useRouter } from "next/navigation";

export default function BookCover({ book }: { book: RecipeBook }) {
  const router = useRouter();

  const handleView = () => {
    console.log(book.name);
    selectedRecipeBook(book);
    router.push(`/db/recipeBook/${book.name}`);
  };

  return (
    <div className="h-140 bg-contrast relative my-2 flex w-full max-w-lg flex-col rounded-lg p-4">
      <div className="bg-contrast w-full text-center text-2xl">{book.name}</div>
      <div className="flex h-40 max-w-md">
        <BookCoverImage />
      </div>
      <div className="bg-contrast h-20 py-4 text-center text-sm">
        {book.description}
      </div>
      <br />
      <div className="text-center">
        {book.build.slice(0, 10).map((build: Build) => {
          return <span key={build.id}>{`${build.recipe.name} - `}</span>;
        })}
        {book.build.length < 10 ? "" : `and ${book.build.length - 10} others`}
      </div>
      <button
        className="bg-contrast absolute bottom-4 right-4 text-xs"
        onClick={handleView}
      >
        <Expand />
      </button>
    </div>
  );
}
