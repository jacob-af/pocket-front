import { Build, Touch } from "@/__generated__/graphql";
import React, { useState } from "react";
import { ShareRecipeModal } from "./share/ShareRecipeModal";

const BuildDisplay = ({ builds }: { builds: Build[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(builds);
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
      <button onClick={handlePrevSlide} className="float-left">
        Previous
      </button>
      <button onClick={handleShare} className="my-auto">
        share
      </button>
      <button onClick={handleNextSlide} className="float-right">
        Next
      </button>
      <ShareRecipeModal
        build={builds[currentSlide]}
        open={open}
        toggleopen={setOpen}
      />
    </div>
  );
};

export default BuildDisplay;
