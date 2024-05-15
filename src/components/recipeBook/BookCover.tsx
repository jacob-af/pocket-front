"use client";

import * as React from "react";

import { Build, RecipeBook } from "@/__generated__/graphql";

import { BookCoverImage } from "@/components/images/BookCoverImage";

export default function BookCover({ book }: { book: RecipeBook }) {
  return (
    <div className="relative my-2 flex w-full max-w-lg flex-col rounded-lg bg-black">
      <div className="w-full bg-black text-center text-2xl">{book.name}</div>
      <div className="flex h-40 max-w-md">
        <BookCoverImage />
      </div>
      <div className="w-full bg-black">{book.description}</div>
      <br />
      {book.build.map((build: Build) => {
        return (
          <React.Fragment
            key={build.id}
          >{`* ${build.buildName} *`}</React.Fragment>
        );
      })}
    </div>
  );
}
