"use client";

import {
  BookIcon,
  BottleIcon,
  GroupIcon,
  HomeIcon,
  MartiniIcon
} from "@/components/images/NavIcons";

import { Bokor } from "next/font/google";
import Link from "next/link";
import React from "react";

export function PublicNavBar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="bg-contrast fixed left-0 right-0 top-0 shadow-lg">
      <nav className="flex items-center justify-around">
        <Link href="/" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "home" ? "text-secondary" : ""
            }`}
            onClick={() => handleChange("home")}
          >
            <HomeIcon />
            <span className="text-xxs">Home</span>
          </span>
        </Link>
        <Link href="/recipeBook" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipeBooks" ? "text-secondary" : ""
            }`}
            onClick={() => handleChange("recipeBooks")}
          >
            <BookIcon />
            <span className="text-xxs">Books</span>
          </span>
        </Link>
        <Link href="/recipe" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipes" ? "text-secondary" : ""
            }`}
            onClick={() => handleChange("recipes")}
          >
            <MartiniIcon />
            <span className="text-xxs">Recipes</span>
          </span>
        </Link>
        <Link href="/ingredient" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "inventory" ? "text-secondary" : ""
            }`}
            onClick={() => handleChange("inventory")}
          >
            <BottleIcon />
            <span className="text-xxs">Ingredients</span>
          </span>
        </Link>
        <Link href="/crew" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "crew" ? "text-secondary" : ""
            }`}
            onClick={() => handleChange("crew")}
          >
            <GroupIcon />
            <span className="text-xxs">Crew</span>
          </span>
        </Link>
      </nav>
    </div>
  );
}
