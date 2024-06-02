"use client";

import * as React from "react";

import { Build, RecipeBook } from "@/__generated__/graphql";

import { BookBorder } from "@/components/images/CardBorder";
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
    <div className="h-140 bg-contrast relative my-2 box-border flex w-full max-w-lg flex-col rounded-lg p-4 shadow-lg">
      <div className="absolute inset-0 z-0 h-full w-full">
        <BookBorder />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div className="mx-12 mt-4 text-center text-2xl">{book.name}</div>
        <div className="flex h-36 w-64 flex-col justify-center">
          <BookCoverImage />
        </div>
        <div className="h-20 py-4 text-center text-sm">{book.description}</div>
        <br />
        <div className="mx-12 text-center">
          {book.userBuild.slice(0, 10).map((build: Build) => {
            return <span key={build.id}>{`${build.recipe.name} - `}</span>;
          })}
          {book.userBuild.length < 10
            ? ""
            : `and ${book.userBuild.length - 10} others`}
        </div>
        <button
          className="bg-contrast absolute bottom-4 right-4 text-xs"
          onClick={handleView}
        >
          <Expand />
        </button>
      </div>
    </div>
  );
}
