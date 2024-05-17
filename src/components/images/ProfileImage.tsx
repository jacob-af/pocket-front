"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";

export function ProfileImage() {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("/withcherry100.png");

  useEffect(() => {
    if (session?.user.image) {
      setImageUrl(session.user.image);
    }
  }, [session?.user.image]);

  return (
    <div className="">
      <Image
        src={imageUrl}
        width={50}
        height={50}
        alt="Pixel drawing of whiskey cocktail on the rocks with cherry"
        className="rounded-full"
      />
    </div>
  );
}
