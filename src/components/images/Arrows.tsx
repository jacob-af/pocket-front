import Image from "next/image";

export function ArrowLeft() {
  return (
    <Image
      src="/singleArrow.png"
      height={25}
      width={25}
      alt="single arrow"
      className="z-10 h-auto w-auto scale-x-[-1] transform dark:invert"
    />
  );
}
export function DoubleArrowLeft() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="double arrow"
      className="z-10 h-auto w-auto scale-x-[-1] transform dark:invert"
    />
  );
}
export function ArrowUp() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="double arrow"
      className="z-10 h-auto w-auto -rotate-90 dark:invert"
    />
  );
}
export function ArrowDown() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="double arrow"
      className="z-10 h-auto w-auto rotate-90 dark:invert"
    />
  );
}

export function ArrowRight() {
  return (
    <Image
      src="/singleArrow.png"
      height={25}
      width={25}
      alt="single arrow"
      className="z-10 h-auto w-auto dark:invert"
    />
  );
}

export function DoubleArrowRight() {
  return (
    <Image
      src="/doubleArrow.png"
      height={25}
      width={25}
      alt="flowerarrow"
      className="z-10 h-auto w-auto dark:invert"
    />
  );
}
