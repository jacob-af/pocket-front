"use client";

import React from "react";

import Link from "next/link";
import {
  HomeIcon,
  GroupIcon,
  BottleIcon,
  MartiniIcon,
  BookIcon
} from "./icons/NavIcons";
import { Bokor } from "next/font/google";

function BottomNavBar() {
  const [value, setValue] = React.useState("home");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-black shadow-lg">
      <nav className="flex justify-around items-center">
        <Link href="/db" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "home" ? "text-orange-500" : "text-white"
            }`}
            onClick={() => handleChange("home")}
          >
            <span>
              Home
              <HomeIcon />
            </span>
          </span>
        </Link>
        <Link href="/db/recipeBook" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipeBooks" ? "text-orange-500" : "text-white"
            }`}
            onClick={() => handleChange("recipeBooks")}
          >
            <span>RecipeBooks</span>
            <BookIcon />
          </span>
        </Link>
        <Link href="/db/recipe" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "recipes" ? "text-orange-500" : "text-white"
            }`}
            onClick={() => handleChange("recipes")}
          >
            <span>Recipes</span>
            <MartiniIcon />
          </span>
        </Link>
        <Link href="/db/inventory" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "inventory" ? "text-orange-500" : "text-white"
            }`}
            onClick={() => handleChange("inventory")}
          >
            <span>Inventory</span>
            <BottleIcon />
          </span>
        </Link>
        <Link href="/db/crew" passHref>
          <span
            className={`flex flex-col items-center p-2 ${
              value === "crew" ? "text-orange-500" : "text-white"
            }`}
            onClick={() => handleChange("crew")}
          >
            <span>
              Crew
              <GroupIcon />
            </span>
          </span>
        </Link>
      </nav>
    </div>
  );
}

export default BottomNavBar;
