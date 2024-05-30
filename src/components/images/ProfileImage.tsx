"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";

export function ProfileImage({ url }: { url: string }) {
  return (
    <div className="">
      <Image
        src={url}
        width={50}
        height={50}
        alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
        className="rounded-full"
      />
    </div>
  );
}
