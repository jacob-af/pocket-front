import { ArrowDown, ArrowUp } from "@/components/images/Arrows";
import React, { useRef, useState } from "react";
import { currentBuild, selectedRecipe } from "@/graphql/reactiveVar/recipes";

import { useReactiveVar } from "@apollo/client";

export function BuildEditPopout() {
  const index = useReactiveVar(currentBuild);
  const recipe = useReactiveVar(selectedRecipe);
  const [isVisible, setIsVisible] = useState(false);

  const togglePopOut = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex">
        {" "}
        {/* New container */}
        <button
          onClick={togglePopOut}
          className="inline-block px-4 py-2 rounded"
        >
          {isVisible ? <ArrowDown /> : <ArrowUp />}
        </button>
        {isVisible && (
          <div className="absolute bottom-10 left-1/2 mx-auto z-10 w-40 p-4 border border-gray-300 transform -translate-x-1/2">
            <div className="pop-out-content flex flex-col items-center">
              <button
                onClick={togglePopOut}
                className="my-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
              >
                Share
              </button>
              {!recipe.userBuild[index]
                ? ""
                : ["EDIT", "MANAGER", "OWNER"].includes(
                    recipe.userBuild[index].permission
                  ) && (
                    <button
                      onClick={togglePopOut}
                      className="my-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                  )}
              <button
                onClick={togglePopOut}
                className="my-2 inline-block bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
