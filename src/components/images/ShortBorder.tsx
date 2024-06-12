import Image from "next/image";

export function TLCorner() {
  return (
    <Image
      priority={true}
      height={15}
      width={15}
      src={"/light-corner.png"}
      alt="dynamically loaded image"
      className="invert dark:invert-0"
    />
  );
}
export function BLCorner() {
  return (
    <Image
      priority={true}
      height={15}
      width={15}
      src={"/light-corner.png"}
      alt="dynamically loaded image"
      className="-rotate-90 invert dark:invert-0"
    />
  );
}
export function TRCorner() {
  return (
    <Image
      priority={true}
      height={15}
      width={15}
      src={"/light-corner.png"}
      alt="dynamically loaded image"
      className="rotate-90 invert dark:invert-0"
    />
  );
}
export function BRCorner() {
  return (
    <Image
      priority={true}
      height={15}
      width={15}
      src={"/light-corner.png"}
      alt="dynamically loaded image"
      className="rotate-180 invert dark:invert-0"
    />
  );
}
