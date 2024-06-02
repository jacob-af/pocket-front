import Image from "next/image";

export function HomeIcon() {
  return (
    //<div className="flex h-8 w-8 items-center justify-center rounded-full border">
    <Image
      src="/Pocket-Icons/home-sm-black.png"
      height={20}
      width={20}
      alt="home icon"
      className="z-10 dark:invert"
    />
    //   <div className="absolute h-4 w-4 bg-blue-900"></div>
    // </div>
  );
}

export function BookIcon() {
  return (
    <Image
      src="/Pocket-Icons/book-sm-black.png"
      width={20}
      height={20}
      alt="home icon"
      className="dark:invert"
    />
  );
}

export function BottleIcon() {
  return (
    <Image
      src="/Pocket-Icons/bottle-sm-black.png"
      width={20}
      height={20}
      alt="home icon"
      className="dark:invert"
    />
  );
}

export function MartiniIcon() {
  return (
    <Image
      src="/Pocket-Icons/martini-sm-black.png"
      width={20}
      height={20}
      alt="home icon"
      className="dark:invert"
    />
  );
}

export function GroupIcon() {
  return (
    <Image
      src="/Pocket-Icons/group-sm-black.png"
      width={20}
      height={20}
      alt="home icon"
      className="dark:invert"
    />
  );
}
