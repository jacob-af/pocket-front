"use client";

import * as React from "react";

import { Build, RecipeBook } from "@/__generated__/graphql";

import { BookCoverImage } from "@/components/images/BookCoverImage";

export default function BookCover({ book }: { book: RecipeBook }) {
  return (
    <div className="relative flex flex-col max-w-lg rounded-lg w-full my-2 bg-black z-10">
      <div className="w-full bg-black text-center text-2xl">{book.name}</div>
      <div className="flex max-w-md h-40">
        <BookCoverImage />
      </div>
      <div className="w-full bg-black">{book.description}</div>
      <br />
      {book.build.map((build: Build) => {
        return <>{`* ${build.buildName} *`}</>;
      })}
    </div>
  );
}
