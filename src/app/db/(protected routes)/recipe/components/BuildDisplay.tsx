"use client";

import { Build, Touch } from "@/__generated__/graphql";
import React, { useState } from "react";
import { newRecipeInfo, touchArray } from "@/app/graphql/reactiveVar/recipes";

import { ShareRecipeModal } from "./shareRecipe/ShareRecipeModal";
import { convertArrayByOrder } from "@/app/db/(protected routes)/recipe/components/recipeActions";
import { useRouter } from "next/navigation";

const BuildDisplay = ({ builds }: { builds: Build[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // Function to handle going to the next slide
  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % builds.length);
  };

  // Function to handle going to the previous slide
  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? builds.length - 1 : prevSlide - 1
    );
  };

  const handleShare = () => {
    setOpen(true);
  };

  const handleEdit = () => {
    console.log(builds[currentSlide].touch);
    const touches = convertArrayByOrder(builds[currentSlide].touch);
    touchArray(touches);

    if (builds[currentSlide].permission == "OWNER") {
      newRecipeInfo({
        id: builds[currentSlide].id,
        name: builds[currentSlide].recipe.name,
        buildName: builds[currentSlide].buildName,
        about: builds[currentSlide].recipe.about || "",
        instructions: builds[currentSlide].instructions || "",
        glassware: builds[currentSlide].glassware || "",
        ice: builds[currentSlide].ice || "",
        touchArray: touches,
        newRecipe: true
      });
    } else {
      newRecipeInfo({
        id: builds[currentSlide].id,
        name: builds[currentSlide].recipe.name,
        buildName: builds[currentSlide].buildName,
        about: builds[currentSlide].recipe.about || "",
        instructions: builds[currentSlide].instructions || "",
        glassware: builds[currentSlide].glassware || "",
        ice: builds[currentSlide].ice || "",
        touchArray: touches,
        newRecipe: false
      });
    }
    router.push("/db/recipe/edit");
  };

  if (builds.length === 0) {
    return <div>This recipe has no builds</div>;
  }

  return (
    <div className="carousel">
      {/* Displaying the current slide */}
      <div className="carousel-slide">
        <h3>{builds[currentSlide].buildName}</h3>
        {builds[currentSlide].touch.map(
          (touch: Touch | null, index: number) => (
            <div key={index}>
              {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
            </div>
          )
        )}
        <p>{builds[currentSlide].instructions}</p>
        <p>Glassware: {builds[currentSlide].glassware}</p>
        <p>Ice: {builds[currentSlide].ice}</p>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        {builds.length >= 2 && (
          <button onClick={handlePrevSlide} className="flex-shrink-0">
            Previous
          </button>
        )}
        {(builds[currentSlide].permission == "OWNER" ||
          builds[currentSlide].permission == "MANAGER") && (
          <button onClick={handleEdit} className="flex-shrink-0">
            Edit
          </button>
        )}
        <button onClick={handleShare} className="flex-grow text-center">
          Share
        </button>
        {builds.length >= 2 && (
          <button onClick={handleNextSlide} className="flex-shrink-0">
            Next
          </button>
        )}
        <ShareRecipeModal
          build={builds[currentSlide]}
          open={open}
          toggleopen={setOpen}
        />
      </div>
    </div>
  );
};

export default BuildDisplay;
