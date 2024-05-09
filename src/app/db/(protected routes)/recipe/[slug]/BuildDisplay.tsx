"use client";

import { Build, Touch } from "@/__generated__/graphql";
import React, { useState } from "react";
import { newRecipeInfo, touchArray } from "@/app/graphql/reactiveVar/recipes";

import { DeleteBuildModal } from "../components/DeleteBuildModal";
import { ShareRecipeModal } from "../components/shareRecipe/ShareRecipeModal";
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

  const handleShare = () => {
    setOpenShare(true);
  };

  const handleEdit = () => {
    const touches = convertArrayByOrder(builds[currentSlide].touch);
    touchArray(touches);

    if (builds[currentSlide].recipe.createdBy?.id == session?.user.id) {
      newRecipeInfo({
        id: builds[currentSlide].id,
        name: builds[currentSlide].recipe.name,
        buildName: builds[currentSlide].buildName,
        about: builds[currentSlide].recipe.about || "",
        instructions: builds[currentSlide].instructions || "",
        glassware: builds[currentSlide].glassware || "",
        ice: builds[currentSlide].ice || "",
        touchArray: touches,
        newRecipe: true,
        permission: builds[currentSlide].permission
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
        newRecipe: false,
        permission: builds[currentSlide].permission
      });
    }
    router.push("/db/recipe/edit");
  };

  const handleDelete = () => {
    setOpenDelete(true);
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
          (touch: Touch | null, index: number) => {
            return (
              <div key={touch?.id}>
                {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
              </div>
            );
          }
        )}
        <p>{builds[currentSlide].instructions}</p>
        <p>Glassware: {builds[currentSlide].glassware}</p>
        <p>Ice: {builds[currentSlide].ice}</p>
      </div>
      {/* Navigation buttons */}
      <div className="grid grid-cols-7 gap-2">
        <div className="col-span-2 w-full">
          {builds.length >= 2 && (
            <button
              onClick={handlePrevSlide}
              className="flex-shrink-0 border-white border p-4"
            >
              Previous
            </button>
          )}
        </div>
        <div className=" w-full">
          {["EDIT", "MANAGER", "OWNER"].includes(
            builds[currentSlide].permission || "ERROR"
          ) && (
            <button
              onClick={handleEdit}
              className="flex-shrink-0 border-white border p-4"
            >
              Edit
            </button>
          )}
        </div>
        <div className=" w-full">
          <button
            onClick={handleShare}
            className="flex-grow text-center border-white border p-4"
          >
            Share
          </button>
        </div>
        <div className=" w-full">
          {builds[currentSlide].createdBy?.id == session?.user.id && (
            <button
              onClick={handleDelete}
              className="flex-shrink-0 border-white border p-4"
            >
              Delete
            </button>
          )}
        </div>
        <div className="col-span-2 w-full">
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
