"use client";

import { Build, Touch } from "@/__generated__/graphql";
import React, { useState } from "react";

import { DeleteBuildModal } from "@/components/modals/DeleteBuildModal";
import { currentBuild } from "@/graphql/reactiveVar/recipes";
import { useReactiveVar } from "@apollo/client";

const BuildDisplay = ({ builds }: { builds: Build[] }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const slide: number = useReactiveVar(currentBuild);

  if (!builds || builds.length === 0) {
    return <div>This recipe has no builds</div>;
  }

  return (
    <div className="carousel">
      {/* Displaying the current slide */}
      <div className="carousel-slide">
        <div>{builds[slide].buildName}</div>
        {builds[slide].touch &&
          builds[slide].touch.map((touch: Touch | null, index: number) => {
            return (
              <div key={touch?.id}>
                {touch?.amount} {touch?.unit} {touch?.ingredient?.name}
              </div>
            );
          })}
        <p>{builds[slide].instructions}</p>
        <p>Glassware: {builds[slide].glassware}</p>
        <p>Ice: {builds[slide].ice}</p>
      </div>

      <div className="flex items-center justify-between">
        <DeleteBuildModal
          build={builds[slide]}
          open={openDelete}
          toggleopen={setOpenDelete}
        />
      </div>
    </div>
  );
};

export default BuildDisplay;
