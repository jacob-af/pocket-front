import Image from "next/image";

export function HomeIcon() {
  return (
    <Image
      src="/Pocket-Icons/home-sm-black.png"
      height={20}
      width={20}
      alt="home icon"
      className="z-10 dark:invert"
    />
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
