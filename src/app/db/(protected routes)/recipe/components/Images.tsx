"use client";

import Image from "next/image";
import { useReactiveVar } from "@apollo/client";
import { useSession } from "next-auth/react";

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

function getRandomImagePath() {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
}

export default function TempImage() {
  const randomImagePath = getRandomImagePath();
  return (
    <Image
      src={randomImagePath}
      width={180}
      height={180}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className="float-left mr-6"
    />
  );
}

export function SmallImage() {
  const randomImagePath = getRandomImagePath();

  return (
    <Image
      src={randomImagePath}
      width={90}
      height={90}
      alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
      className=""
    />
  );
}

export function ProfileImage() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-16 right-6">
      <Image
        src={session?.user.image || "/withcherry100.png"}
        width={90}
        height={90}
        alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
        className="rounded-full "
      />
    </div>
  );
}
