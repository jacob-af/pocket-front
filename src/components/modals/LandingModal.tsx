"use client";

import { ModalWrapper } from "./ModalWrapper";
import { useState } from "react";

export default function LandingModal() {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <ModalWrapper open={open} toggleopen={toggleOpen}>
      <div className="bg-background mb-2 max-w-2xl overflow-auto">
        <div className="my-8 text-center text-4xl">Welcome to Pocket</div>
        <div className="my-8 text-justify text-xl">
          Welcome to Pocket Bar Book, a bar management tool designed by a
          bartender, for bartenders. Current capabilites are storing and editing
          recipes. Recipes can be organized into recipe books. Recipes, specific
          builds, and recipe books can be visited at specific URLs. The next
          goal will be making recipe books shareable before adding inventory and
          costing capabilities.
        </div>
      </div>
    </ModalWrapper>
  );
}
