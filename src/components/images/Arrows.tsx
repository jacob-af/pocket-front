import Image from "next/image";

export function ArrowLeft() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="flower arrow"
      className="z-10  dark:invert transform scale-x-[-1]"
    />
  );
}
export function ArrowUp() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="flower arrow"
      className="z-10  dark:invert -rotate-90"
    />
  );
}
export function ArrowDown() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="flower arrow"
      className="z-10  dark:invert rotate-90"
    />
  );
}

export function ArrowRight() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="flowerarrow"
      className="z-10 dark:invert"
    />
  );
}
