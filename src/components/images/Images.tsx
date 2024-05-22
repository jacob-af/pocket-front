"use client";

import { useEffect, useRef } from "react";

import Image from "next/image";
import { useReactiveVar } from "@apollo/client";

const imagePaths = [
  "/pixel-cocktails/b52.png",
  "/pixel-cocktails/beesknees.png",
  "/pixel-cocktails/boulevardier.png",
  "/pixel-cocktails/cosmo.png",
  "/pixel-cocktails/daiquiri.png",
  "/pixel-cocktails/ginandtonic.png",
  "/pixel-cocktails/maitai.png",
  "/pixel-cocktails/malibusunset.png",
  "/pixel-cocktails/margarita.png",
  "/pixel-cocktails/martini.png",
  "/pixel-cocktails/mojito.png",
  "/pixel-cocktails/moscowmule.png",
  "/pixel-cocktails/oldfashioned.png",
  "/pixel-cocktails/whiterussian.png"
];

export default function TempImage() {
  return (
    <Image
      priority
      src={imagePaths[10]}
      width={180}
      height={180}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left mr-6"
    />
  );
}

export function SmallImage() {
  //const randomImagePath = getRandomImagePath();

  return (
    <Image
      src={imagePaths[10]}
      width={90}
      height={90}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className=""
    />
  );
}

export function DownArrow() {
  return (
    <Image
      src={"/down-arrow.png"}
      width={15}
      height={15}
      alt="Pixel down arrow"
      className="z-10 dark:invert"
    />
  );
}

export function UpArrow() {
  return (
    <Image
      src={"/up-arrow.png"}
      width={15}
      height={15}
      alt="Pixel down arrow"
      className="z-10 dark:invert"
    />
  );
}

export function Expand() {
  return (
    <Image
      src={"/expand.png"}
      width={15}
      height={15}
      alt="Pixel down arrow"
      className="z-10 dark:invert"
    />
  );
}
