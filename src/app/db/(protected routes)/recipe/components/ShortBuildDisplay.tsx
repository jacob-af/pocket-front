"use client";

import { Build, Touch } from "@/__generated__/graphql";
import React, { useState } from "react";
import { newRecipeInfo, touchArray } from "@/app/graphql/reactiveVar/recipes";

import { DeleteBuildModal } from "./DeleteBuildModal";
import { ShareRecipeModal } from "./shareRecipe/ShareRecipeModal";
import { convertArrayByOrder } from "@/app/db/(protected routes)/recipe/components/recipeActions";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const BuildDisplay = ({ builds }: { builds: Build[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openShare, setOpenShare] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  //console.log(builds[currentSlide].createdBy?.id, session?.user.id);
  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % builds.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide =>
      prevSlide === 0 ? builds.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="carousel">
      {/* Displaying the current slide */}
      <div className="carousel-slide">
        <h3>{builds[currentSlide].buildName}</h3>
        {builds[currentSlide].touch.map(
          (touch: Touch | null, index: number) => {
            return (
              <div key={touch?.id}>
                {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
              </div>
            );
          }
        )}
      </div>
      {/* Navigation buttons */}
      <div className="grid grid-cols-5 gap-2">
        <div className="">
          {builds.length >= 2 && (
            <button
              onClick={handlePrevSlide}
              className="flex-shrink-0 border-white border p-4"
            >
              Previous
            </button>
          )}
        </div>
        <div className="">
          {builds.length >= 2 && (
            <button
              onClick={handleNextSlide}
              className="flex-shrink-0 border-white border p-4"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <ShareRecipeModal
          build={builds[currentSlide]}
          open={openShare}
          toggleopen={setOpenShare}
        />
        <DeleteBuildModal
          build={builds[currentSlide]}
          open={openDelete}
          toggleopen={setOpenDelete}
        />
      </div>
    </div>
  );
};

export default BuildDisplay;
