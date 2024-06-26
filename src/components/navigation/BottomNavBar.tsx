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

function BottomNavBar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="bg-contrast fixed bottom-0 left-0 right-0 z-50 pb-10 shadow-lg lg:hidden">
      <nav className="flex items-center justify-around">
        <Link href="/db" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "home" ? "text-secondary" : "text-primary"
            }`}
            onClick={() => handleChange("home")}
          >
            <HomeIcon />
            <span className="text-xxs">Home</span>
          </span>
        </Link>
        <Link href="/db/recipeBook" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipeBooks" ? "text-secondary" : "text-primary"
            }`}
            onClick={() => handleChange("recipeBooks")}
          >
            <BookIcon />
            <span className="text-xxs">Books</span>
          </span>
        </Link>
        <Link href="/db/recipe" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipes" ? "text-secondary" : "text-primary"
            }`}
            onClick={() => handleChange("recipes")}
          >
            <MartiniIcon />
            <span className="text-xxs">Recipes</span>
          </span>
        </Link>
        <Link href="/db/inventory" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "inventory" ? "text-secondary" : "text-primary"
            }`}
            onClick={() => handleChange("inventory")}
          >
            <BottleIcon />
            <span className="text-xxs">Inventory</span>
          </span>
        </Link>
        <Link href="/db/crew" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "crew" ? "text-secondary" : "text-primary"
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

export default BottomNavBar;
